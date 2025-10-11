<template>
  <div class="chatbot-container">
    <div class="product-suggestions-container" v-if="suggestedBooks.length && !isChatOpen">
    <div class="product-suggestions">
  <h5 class="suggestion-title">Gợi ý sách cho bạn</h5>
  <div class="suggestion-carousel">
    <transition-group name="book-fade" tag="div">
      <div 
        v-for="(book, index) in suggestedBooks.slice(0, 3)" 
        :key="book.id"
        class="suggestion-item"
        v-show="index === currentBookIndex"
      >
        <img :src="book.hinh_anh" alt="Book cover" class="suggestion-image" />
        <div class="suggestion-details">
          <router-link :to="'/chi-tiet/' + book.id + '-' + book.slug_sach">
            <h6>{{ truncate(book.ten_sach, 20) }}</h6>
          </router-link>
          <p>{{ formatVND(book.gia_km) }}</p>
        </div>
      </div>
    </transition-group>
  </div>
</div>
  </div>

  <div class="chatbot-container">
    <div class="chatbot-icon" @click="toggleChat">
      <i class="bx bx-bot"></i>
      <span v-if="unreadCount > 0" class="unread-count">{{ unreadCount }}</span>
    </div>

    
    <div v-if="isChatOpen" class="chatbox">
      
      <div class="chat-messages" ref="chatMessages">
        <div v-for="(message, index) in messages" :key="index" class="message-wrapper" :class="{ 'user-message': message.isUser }">
          <div v-if="!message.isUser" class="bot-avatar">
      <img src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg?semt=ais_hybrid&w=740" alt="Bot" />
    </div>
    
          <div class="message">
      {{ message.text }}
    </div>
        </div>
        <div v-if="isTyping" class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>

      <div class="bottom-tab-header">
        <div class="branding">
          <span>Quốc Đạt Bookstore</span>
        </div>
        <div class="actions">
          <button @click="loadInitialMessages" class="icon-btn">
            <i class="bx bx-refresh"></i>
          </button>
          <button @click="toggleChat" class="icon-btn close">
            <i class="bx bx-x"></i>
          </button>
        </div>
      </div>

      <div class="chat-input">
        <input v-model="inputMessage" @keyup.enter="sendMessage" placeholder="Nhập tin nhắn..." @focus="scrollToBottom" />
        <button @click="sendMessage" class="send-btn">
          <i class="bx bx-send"></i>
        </button>
      </div>
      <div class="quick-replies">
  <button @click="selectQuickReply('Tôi muốn tìm sách của Nguyễn Nhật Ánh')"><i class="bx bx-book"></i> Nguyễn Nhật Ánh</button>
  <button @click="selectQuickReply('Bạn có thể giới thiệu sách trinh thám không?')"><i class="bx bx-search-alt"></i> Trinh thám</button>
  <button @click="selectQuickReply('Dế mèn phiêu lưu kí')"><i class="bx bx-star"></i> Dế mèn phiêu lưu kí</button>
  <button @click="loadInitialMessages" class="refresh-btn">🔄 Làm mới</button>
  
</div>

    </div></div>
  </div>
  
</template>

<script>
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

async function callSearchBooksAPI(query) {
    try {
        let normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        normalizedQuery = normalizedQuery.replace(/[đĐ]/g, "d");
        console.log("Gửi yêu cầu API với query:", normalizedQuery);
        const response = await axios.get(`http://127.0.0.1:8000/api/home/books/search?q=${encodeURIComponent(normalizedQuery)}`);
        console.log("Phản hồi từ API:", response.data);
        if (!response.data.books) {
            console.error("API không trả về danh sách sách:", response.data);
            return [];
        }
        return response.data.books;
    } catch (error) {
        console.error("Lỗi khi gọi API tìm kiếm sách:", error.response?.data || error.message);
        return [];
    }
}

async function callGetBookDetailsAPI(slug) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/home/chi-tiet-sach-by-slug/${encodeURIComponent(slug)}`);
        return response.data.book || null;
    } catch (error) {
        console.error("Lỗi khi gọi API chi tiết sách:", error.response?.data || error.message);
        return null;
    }
}

async function callListGenresAPI() {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/home/danh-muc-sach`);
        return response.data.categories || [];
    } catch (error) {
        console.error("Lỗi khi gọi API danh sách thể loại:", error.response?.data || error.message);
        return [];
    }
}

export default {
  data() {
    return {
      isChatOpen: false,
      inputMessage: '',
      messages: [],
      unreadCount: 0,
      suggestedBooks: [],
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
      genAI: null,
      chat: null,
      currentBookIndex: 0, 
    bookInterval: null
    };
  },
  updated() {
  this.$nextTick(() => {
    const container = this.$refs.chatMessages;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
},

  mounted() {
    this.loadSuggestedBooks().then(() => {
    if (this.suggestedBooks.length >= 3) {
      this.startBookCarousel();
    }
  });
    this.initializeGemini();
    const saved = localStorage.getItem('chatHistory');
  if (saved) {
  this.messages = JSON.parse(saved);
} else {
  this.messages = [
    { text: 'Xin chào Anh/Chị! Em là trợ lý AI của Quốc Đạt Bookstore', isUser: false },
    { text: 'Em rất sẵn lòng hỗ trợ Anh/Chị 😊', isUser: false }
  ];
}
  },

watch: {
  messages: {
    handler(val) {
      localStorage.setItem('chatHistory', JSON.stringify(val));
    },
    deep: true
  }
},
beforeUnmount() {
  this.stopBookCarousel();
},

  methods: {
    truncate(text, maxLength) {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  },
    startBookCarousel() {
    clearInterval(this.bookInterval);
    this.bookInterval = setInterval(() => {
      this.currentBookIndex = (this.currentBookIndex + 1) % 3; 
    }, 4500); 
  },
  
  stopBookCarousel() {
    clearInterval(this.bookInterval);
  },
    loadInitialMessages() {
  this.messages = [
    { text: 'Xin chào Anh/Chị! Em là trợ lý AI của Quốc Đạt Bookstore', isUser: false },
    { text: 'Em rất sẵn lòng hỗ trợ Anh/Chị 😊', isUser: false }
  ];
  localStorage.removeItem('chatHistory');
}
,
    selectQuickReply(text) {
    this.inputMessage = text;
    this.sendMessage();
  },
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
      if (this.isChatOpen) this.unreadCount = 0;
    },

    initializeGemini() {
            if (!this.apiKey) {
                console.error("API Key for Gemini is not loaded.");
                this.messages.push({ text: 'Rất tiếc, có vẻ như tôi đang gặp chút vấn đề kết nối. Bạn vui lòng thử lại sau nhé!', isUser: false });
                return;
            }
            this.genAI = new GoogleGenerativeAI(this.apiKey);
            this.chat = this.genAI.getGenerativeModel({
                model: 'gemini-1.5-flash',
                tools: [
                    {
                        functionDeclarations: [
                            {
                                name: 'search_books', 
                                description: 'Tìm kiếm các đầu sách có sẵn tại cửa hàng theo tên sách, tác giả hoặc thể loại. Hàm này rất tiện khi khách hàng muốn tìm một cuốn sách cụ thể hay sách theo chủ đề họ yêu thích.',
                                parameters: {
                                    type: 'OBJECT',
                                    properties: {
                                        query: {
                                            type: 'STRING',
                                            description: 'Từ khóa để tìm kiếm sách (ví dụ: "Nguyễn Nhật Ánh", "sách nấu ăn", "truyện trinh thám", "lịch sử").',
                                        },
                                    },
                                    required: ['query'], 
                                },
                            },
                             {
                                 name: 'get_book_details',
                               description: 'Lấy thông tin chi tiết về một cuốn sách dựa trên ID hoặc slug. Sử dụng khi người dùng hỏi thông tin cụ thể về một cuốn sách.',
                                 parameters: {
                                     type: 'OBJECT',
                                     properties: {
                                         id_or_slug: { type: 'STRING', description: 'ID hoặc slug của cuốn sách.' },
                                     },
                                     required: ['id_or_slug'],
                             },
                            },
                             
                             {
                                 name: 'list_genres',
                                description: 'Liệt kê tất cả các loại sách mà Quốc Đạt Bookstore đang có.',
                                parameters: { type: 'OBJECT', properties: {} },
                             },
                        ],
                    },
                ],
                systemInstruction: 'Bạn là một nhân viên chatbot thân thiện và nhiệt tình của cửa hàng sách Quốc Đạt Bookstore. Nhiệm vụ chính của bạn là giúp khách hàng tìm kiếm sách theo tên, tác giả, hoặc thể loại, và cung cấp thông tin chi tiết về sách khi được yêu cầu. Nếu khách hàng hỏi về một cuốn sách cụ thể, hãy sử dụng hàm `search_books` hoặc `get_book_details` để trả lời. Chỉ liệt kê danh mục sách khi khách hàng yêu cầu rõ ràng về thể loại. Hãy nói chuyện tự nhiên, dễ hiểu, như một nhân viên tư vấn, và tránh dùng từ ngữ kỹ thuật như "cơ sở dữ liệu" hay "API".',
            }).startChat();
        },

    async sendMessage() {
            if (!this.inputMessage.trim()) return;
            const userMessage = this.inputMessage;
            this.messages.push({ text: userMessage, isUser: true });
            this.inputMessage = '';

            if (!this.chat) {
                this.messages.push({ text: 'Rất tiếc, tôi đang gặp chút trục trặc. Bạn thử lại nhé!', isUser: false });
                return;
            }

            try {
                const result = await this.chat.sendMessage(userMessage);
                const response = result.response;
                const responseParts = response.candidates?.[0]?.content?.parts;

                let botReply = '';

                if (responseParts) {
                    for (const part of responseParts) {
                        if (part.text) {
                            botReply += part.text;
                        } else if (part.functionCall) {
                            const functionCall = part.functionCall;
                            if (functionCall.name === 'search_books') {
                                const query = functionCall.args.query;
                                this.messages.push({ text: `Dạ, để tôi tìm các cuốn sách liên quan đến "${query}"cho bạn nhé...`, isUser: false });

                                const books = await callSearchBooksAPI(query);

                               
                                const functionResponseData = {
                                    books: books.map(book => ({
                                        id: book.id,
                                        ten_sach: book.ten_sach,
                                        tac_gia: book.ten_tac_gia, 
                                        gia_km: book.gia_km,
                                        hinh_anh: book.hinh_anh,
                                        slug_sach: book.slug_sach,
                                        ten_danh_muc: book.ten_danh_muc, 
                                        ten_nxb: book.ten_nxb,
                                        so_luong_ban: book.so_luong_ban
                                    }))
                                };

                                const toolResponseResult = await this.chat.sendMessage([
                                    {
                                        functionResponse: {
                                            name: 'search_books',
                                            response: functionResponseData,
                                        },
                                    },
                                ]);

                                
                                botReply = toolResponseResult.response.candidates?.[0]?.content?.parts?.[0]?.text || '';

                               
                                if (books.length === 0 && (!botReply || botReply.includes("Tôi không tìm thấy"))) {
                                     botReply = `Xin lỗi bạn, tôi chưa tìm thấy cuốn sách nào phù hợp với từ khóa "${query}"trong cửa hàng mình rồi. Bạn có muốn thử tìm kiếm bằng từ khóa khác không ạ?`;
                                } else if (books.length > 0 && (!botReply || botReply.length < 20)) { 
                                     let bookList = books.map(b => `- **${b.ten_sach}** của ${b.tac_gia} (${this.formatVND(b.gia_km)})- ${b.ten_nxb} (${b.so_luong_ban} lượt mua)`).join('\n');
                                     botReply = `Tuyệt vời! Tôi đã tìm thấy một số đầu sách phù hợp với "${query}"đây ạ:\n${bookList}\nBạn có muốn biết thêm chi tiết về cuốn nào không?`;
                                }
                            }
                            
                            else if (functionCall.name === 'get_book_details') {
                                const slug = functionCall.args.slug;
                                this.messages.push({ text: `Đang tìm chi tiết sách với slug "${slug}"...`, isUser: false });

                                const bookDetails = await callGetBookDetailsAPI(slug); 

                                const toolResponseResult = await this.chat.sendMessage([
                                    {
                                        functionResponse: {
                                            name: 'get_book_details',
                                            response: { details: bookDetails }, 
                                        },
                                    },
                                ]);
                                botReply = toolResponseResult.response.candidates?.[0]?.content?.parts?.[0]?.text || '';

                                if (!bookDetails) {
                                    botReply = `Xin lỗi, tôi không tìm thấy chi tiết cho cuốn sách có slug "${slug}". Bạn vui lòng kiểm tra lại tên hoặc thử tìm kiếm lại nhé!`;
                                } else if (!botReply || botReply.length < 20) {
                                    botReply = `Tuyệt vời! Đây là thông tin chi tiết về cuốn **"${bookDetails.ten_sach}":\n` +
                                                `- Tác giả: ${bookDetails.tac_gia.ten_tac_gia}\n` +
                                                `- Danh mục: ${bookDetails.danh_muc.ten_danh_muc}\n` +
                                                `- Nhà xuất bản: ${bookDetails.nha_xuat_ban.ten_nha_xuat_ban}\n` +
                                                `- Giá bán tại cửa hàng: ${this.formatVND(bookDetails.gia_km)}\n` +
                                                `Bạn có thể xem thêm tại: /chi-tiet/${bookDetails.id}-${bookDetails.slug_sach}`;
                                }
                            }
                            else if (functionCall.name === 'list_genres') {
                                this.messages.push({ text: `Dạ, để tôi xem cửa hàng mình đang có những loại sách nào nhé...`, isUser: false });

                                const genres = await callListGenresAPI(); 

                                const toolResponseResult = await this.chat.sendMessage([
                                    {
                                        functionResponse: {
                                            name: 'list_genres',
                                            response: { genres: genres }, 
                                        },
                                    },
                                ]);
                                botReply = toolResponseResult.response.candidates?.[0]?.content?.parts?.[0]?.text || '';

                                if (genres.length === 0) {
                                    botReply = `Rất tiếc, hiện tại tôi không thể liệt kê các loại sách. Bạn thử hỏi lại sau nhé!`;
                                } else if (!botReply || botReply.length < 20) {
                                    let genreList = genres.map(g => `- ${g.ten_danh_muc}`).join('\n');
                                    botReply = `Tại Quốc Đạt Bookstore, chúng tôi có đa dạng các loại sách như:\n${genreList}\nBạn muốn tìm sách thuộc thể loại nào để tôi gợi ý thêm ạ?`;
                                }
                            }
                        }
                    }
                } else {
                    botReply = response.text();
                }

                if (!botReply) {
                    botReply = "Xin lỗi, tôi không hiểu yêu cầu của bạn. Bạn có thể hỏi rõ hơn không?";
                }

                this.messages.push({ text: botReply, isUser: false });

            } catch (error) {
                this.messages.push({ text: 'Rất tiếc, tôi đang gặp chút khó khăn trong việc kết nối. Bạn vui lòng thử lại nhé!', isUser: false });
                console.error('Lỗi Gemini hoặc Function Calling:', error);
            }
            this.unreadCount++;
        },

    
    formatVND(number) {
      return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number);
    },
    async loadSuggestedBooks() {
      try {
        console.log("Đang gọi API gợi ý sách...");
        const response = await axios.get('http://127.0.0.1:8000/api/home/data-goi-y');
        console.log("Kết quả API:", response.data);
        this.suggestedBooks = response.data.list_sach_goi_y || [];
        console.log("Danh sách sách gợi ý:", this.suggestedBooks);
      } catch (error) {
        console.error('Lỗi khi tải gợi ý sách:', error);
      }
    },
  },
};
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.product-suggestions-container {
  position: fixed;
  bottom: 100px; 
  right: 20px;
  z-index: 999;
}
.product-suggestions {
  background: #fff;
  border-radius: 12px;
   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 15px;
  max-width: 350px;
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
}

.suggestion-title {
  font-size: 15px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}

.book-fade-enter-active,
.book-fade-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}
.book-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.book-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.suggestion-carousel {
  position: relative;
  height: 100px; 
  width: 100px;
}

.suggestion-item {
  display: flex;
  align-items: center;
  width: 100%;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 8px;
}

.suggestion-image {
  width: 50px;
  height: 70px;
  object-fit: cover;
  margin-right: 10px;
}

.suggestion-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.suggestion-image {
  width: 60px;
  height: 80px;
  object-fit: cover;
  margin-right: 12px;
  border-radius: 4px;
}

.suggestion-details h6 {
  font-size: 14px;
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-weight: 600;
}

.suggestion-details p {
  font-size: 13px;
  margin: 0;
  color: #e74c3c;
  font-weight: 500;
}

.quick-replies {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 10px;
}

.quick-replies button {
  background-color: #f1f1f1;
  border: none;
  border-radius: 16px;
  padding: 5px 10px;
  font-size: 13px;
  cursor: pointer;
}


.chatbot-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  font-size: 28px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: all 0.3s ease;
}

.chatbot-icon:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.unread-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e74c3c;
  color: #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.chatbox {
  width: 380px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: block;
  margin-top: 15px;
  z-index: 1001;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.chatbot-icon {
  display: v-bind(!isChatOpen ? 'flex' : 'none');
}


.bottom-tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: #f1f5f9;
  border-top: 1px solid #e0e0e0;
  border-radius: 0 0 15px 15px;
}

.branding {
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

.icon-btn {
  background: none;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #7f8c8d;
  transition: all 0.2s;
}

.icon-btn.close {
  color: #e74c3c;
}

.icon-btn:hover {
  background: #e0e0e0;
}

.chat-messages {
  height: 350px;
  overflow-y: auto;
  padding: 20px;
  background-color: #f5f7fa;
  scroll-behavior: smooth;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.message-wrapper {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
}

.message-wrapper.user-message {
  justify-content: flex-end;
}

.bot-avatar img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
  border: 2px solid #e0e0e0;
}

.message {
  padding: 12px 16px;
  border-radius: 18px;
  max-width: 75%;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
  position: relative;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.message-wrapper:not(.user-message) .message {
  background-color: #fff;
  color: #333;
  border-top-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.message-wrapper.user-message .message {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: #fff;
  border-top-right-radius: 4px;
}

.typing-indicator {
  display: flex;
  padding: 10px 15px;
  background: #fff;
  border-radius: 18px;
  width: fit-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-top: 5px;
}

.typing-dot {
  width: 8px;
  height: 8px;
  background-color: #95a5a6;
  border-radius: 50%;
  margin: 0 3px;
  animation: typingAnimation 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) {
  animation-delay: 0s;
}
.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}
.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typingAnimation {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-5px); }
}

.user-message {
  background: #e9ecef;
  margin-left: auto;
}

.chat-input {
   display: flex;
  padding: 15px;
  border-top: 1px solid #e0e0e0;
  background: #fff;
  align-items: center;
}

.chat-input input {
  flex-grow: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
}

.chat-input input:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.send-btn {
  width: 44px;
  height: 44px;
  margin-left: 10px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: #fff;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 3px 10px rgba(52, 152, 219, 0.3);
}

.quick-replies {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 15px 15px 15px;
  background: #fff;
}

.quick-replies button {
  background-color: #f1f5f9;
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
  color: #2c3e50;
}

.quick-replies button:hover {
  background-color: #e2e8f0;
  transform: translateY(-2px);
}

.quick-replies button i {
  font-size: 14px;
}


@media (max-width: 480px) {
  .chatbox {
    width: 90vw;
    right: 5vw;
    bottom: 80px;
  }
  
  .chat-messages {
    height: 50vh;
  }
  
  .product-suggestions {
    max-width: 90vw;
  }
}

.chat-input button {
  padding: 5px 10px;
  margin-left: 5px;
  background: #0d6efd;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


</style>