<template>
  <div class="chatbot">
    <!-- Toggle Button -->
    <div 
      v-if="!isOpen" 
      @click="toggleChat" 
      class="chat-toggle-button"
      title="Mở chat"
    >
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
    </div>

    <!-- Chat Container -->
    <div v-if="isOpen" class="chat-container">
      <!-- Header -->
      <div class="chat-header">
        <!-- <div class="header-content">
          <div class="bot-status">
            <div class="status-dot"></div>
            <h3 class="chat-title">Đạt Store Assistant</h3>
          </div>
          <span class="status-text">Trực tuyến</span>
        </div> -->
        <button @click="toggleChat" class="close-button" title="Đóng chat">
          <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      <!-- Chat Messages -->
      <div class="chat-box" ref="chatBox">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <div v-if="message.role === 'user'" class="user-message">
            <div class="message-content user-content">{{ message.content }}</div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
          <div v-if="message.role === 'bot'" class="bot-message">
            <div class="bot-avatar">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <div class="message-wrapper">
              <div class="message-content bot-content" v-html="convertMarkdown(message.content)"></div>
              <div class="message-time">{{ formatTime(message.timestamp) }}</div>
            </div>
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isTyping" class="bot-message typing-indicator">
          <div class="bot-avatar">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <!-- Input Container -->
      <div class="input-container">
        <div class="input-wrapper">
          <input 
            v-model="userMessage" 
            @keyup.enter="sendMessage"
            :disabled="isTyping"
            placeholder="Nhập câu hỏi về sách..." 
            class="message-input"
            ref="messageInput"
          />
          <button 
            @click="sendMessage" 
            :disabled="isTyping || !userMessage.trim()"
            class="send-button"
            title="Gửi tin nhắn"
          >
            <svg v-if="!isTyping" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
            <div v-else class="loading-spinner"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { marked } from 'marked';

export default {
  data() {
    return {
      isOpen: false,
      userMessage: "",
      isTyping: false,
      offset: 0,
      messages: [
        { 
          role: "bot", 
          content: "Xin chào! Tôi là trợ lý của Đạt Store. Tôi có thể giúp bạn tìm sách theo thể loại, tác giả hoặc chủ đề. Bạn cần tìm loại sách nào?",
          timestamp: new Date()
        }
      ]
    };
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$nextTick(() => {
          this.scrollToBottom();
          if (this.$refs.messageInput) {
            this.$refs.messageInput.focus();
          }
        });
      }
    },

    async sendMessage() {
      if (this.userMessage.trim() === "" || this.isTyping) return;

      const messageContent = this.userMessage.trim();
      this.messages.push({ 
        role: "user", 
        content: messageContent,
        timestamp: new Date()
      });

      this.userMessage = "";
      this.isTyping = true;
      this.scrollToBottom();

      try {
        const response = await axios.post("http://127.0.0.1:8000/api/gpt/sendmessage", {
          message: messageContent,
          offset: this.offset
        });
        
        if (response.data.text) {
          this.messages.push({ 
            role: "bot", 
            content: response.data.text,
            timestamp: new Date()
          });
          
          if (response.data.offset !== undefined) {
            this.offset = response.data.offset;
          }
        }
      } catch (error) {
        console.error("Error details:", error.response || error.message);
        this.messages.push({ 
          role: "bot", 
          content: `Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.`,
          timestamp: new Date()
        });
      } finally {
        this.isTyping = false;
        this.scrollToBottom();
      }
    },
    
    convertMarkdown(content) {
      marked.setOptions({
        breaks: true,
        gfm: true
      });
      
      let htmlContent = marked(content);

      // Sửa lỗi dòng này
      htmlContent = htmlContent.replace(/<p>/g, '<p class="md-p">');
      htmlContent = htmlContent.replace(/<strong>/g, '<strong class="md-strong">');
      htmlContent = htmlContent.replace(/<em>/g, '<em class="md-em">');
      htmlContent = htmlContent.replace(/<a /g, '<a class="md-link" target="_blank" rel="noopener noreferrer" ');
      htmlContent = htmlContent.replace(/<h1>/g, '<h1 class="md-h1">');
      htmlContent = htmlContent.replace(/<h2>/g, '<h2 class="md-h2">');
      htmlContent = htmlContent.replace(/<h3>/g, '<h3 class="md-h3">');
      htmlContent = htmlContent.replace(/<ul>/g, '<ul class="md-ul">');
      htmlContent = htmlContent.replace(/<ol>/g, '<ol class="md-ol">');
      htmlContent = htmlContent.replace(/<li>/g, '<li class="md-li">');
      htmlContent = htmlContent.replace(/<code>/g, '<code class="md-code">');
      htmlContent = htmlContent.replace(/<pre>/g, '<pre class="md-pre">');
      htmlContent = htmlContent.replace(/<blockquote>/g, '<blockquote class="md-blockquote">');

      return htmlContent;
    },

    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.chatBox) {
          this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
        }
      });
    },

    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.chatbot {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
}

/* Toggle Button */
.chat-toggle-button {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.chat-toggle-button:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.6);
}

.chat-toggle-button:active {
  transform: scale(1.05);
}

/* Chat Container - Desktop First */
.chat-container {
  width: 420px;
  height: 650px;
  max-height: calc(100vh - 100px);
  background: white;
  border-radius: 24px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Header */
.chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.header-content {
  flex: 1;
}

.bot-status {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #4ade80;
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.9); }
}

.chat-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.status-text {
  font-size: 12px;
  opacity: 0.85;
}

.close-button {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px;
  border-radius: 12px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: rotate(90deg);
}

/* Chat Messages */
.chat-box {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  background: #f8fafc;
  scroll-behavior: smooth;
  min-height: 0;
}

.chat-box::-webkit-scrollbar {
  width: 6px;
}

.chat-box::-webkit-scrollbar-track {
  background: transparent;
}

.chat-box::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.chat-box::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.message {
  margin-bottom: 16px;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* User Messages */
.user-message {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 16px;
  border-radius: 18px 18px 4px 18px;
  max-width: 75%;
  word-wrap: break-word;
  word-break: break-word;
  box-shadow: 0 2px 12px rgba(102, 126, 234, 0.3);
  font-size: 15px;
  line-height: 1.5;
}

/* Bot Messages */
.bot-message {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.bot-avatar {
  width: 36px;
  height: 36px;
  min-width: 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.25);
}

.message-wrapper {
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 46px);
  min-width: 0;
}

.bot-content {
  background: white;
  color: #1e293b;
  padding: 14px 18px;
  border-radius: 18px 18px 18px 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  font-size: 15px;
  line-height: 1.7;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
}

/* Enhanced Markdown Styles */
.bot-content :deep(.md-p) {
  margin: 0 0 12px 0;
  line-height: 1.7;
  color: #334155;
}

.bot-content :deep(.md-p:last-child) {
  margin-bottom: 0;
}

.bot-content :deep(.md-strong) {
  font-weight: 600;
  color: #667eea;
}

.bot-content :deep(.md-em) {
  font-style: italic;
  color: #f97316;
}

.bot-content :deep(.md-link) {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid rgba(102, 126, 234, 0.3);
  transition: all 0.2s;
  word-break: break-all;
  padding: 1px 2px;
  border-radius: 3px;
  display: inline-block;
}

.bot-content :deep(.md-link:hover) {
  background: rgba(102, 126, 234, 0.1);
  border-bottom-color: #667eea;
}

.bot-content :deep(.md-h1) {
  font-size: 1.5em;
  font-weight: 700;
  margin: 16px 0 12px 0;
  color: #0f172a;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 8px;
}

.bot-content :deep(.md-h2) {
  font-size: 1.3em;
  font-weight: 600;
  margin: 14px 0 10px 0;
  color: #1e293b;
}

.bot-content :deep(.md-h3) {
  font-size: 1.15em;
  font-weight: 600;
  margin: 12px 0 8px 0;
  color: #334155;
}

.bot-content :deep(.md-ul),
.bot-content :deep(.md-ol) {
  margin: 12px 0;
  padding-left: 24px;
}

.bot-content :deep(.md-li) {
  margin: 6px 0;
  line-height: 1.6;
  color: #475569;
}

.bot-content :deep(.md-li::marker) {
  color: #667eea;
}

.bot-content :deep(.md-code) {
  background: #f1f5f9;
  color: #e11d48;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.9em;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  border: 1px solid #e2e8f0;
}

.bot-content :deep(.md-pre) {
  background: #1e293b;
  color: #e2e8f0;
  padding: 16px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 12px 0;
  border: 1px solid #334155;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.bot-content :deep(.md-pre .md-code) {
  background: transparent;
  color: inherit;
  padding: 0;
  border: none;
}

.bot-content :deep(.md-blockquote) {
  border-left: 4px solid #667eea;
  padding-left: 16px;
  margin: 12px 0;
  color: #64748b;
  font-style: italic;
  background: #f8fafc;
  padding: 12px 16px;
  border-radius: 0 8px 8px 0;
}

/* Message Time */
.message-time {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 4px;
  font-weight: 500;
}

/* Typing Indicator */
.typing-dots {
  display: flex;
  gap: 6px;
  background: white;
  padding: 16px 20px;
  border-radius: 18px 18px 18px 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  background: #94a3b8;
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite both;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* Input Container */
.input-container {
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
  background: white;
  flex-shrink: 0;
}

.input-wrapper {
  display: flex;
  gap: 10px;
  align-items: center;
}

.message-input {
  flex: 1;
  padding: 12px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 24px;
  font-size: 15px;
  outline: none;
  transition: all 0.2s;
  background: #f8fafc;
  min-width: 0;
}

.message-input:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.message-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-button {
  width: 44px;
  height: 44px;
  min-width: 44px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  flex-shrink: 0;
}

.send-button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.send-button:active:not(:disabled) {
  transform: scale(0.95);
}

.send-button:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Tablet - Medium Screens */
@media (max-width: 768px) and (min-width: 481px) {
  .chatbot {
    bottom: 20px;
    right: 20px;
  }
  
  .chat-container {
    width: 380px;
    height: 600px;
  }
  
  .chat-toggle-button {
    width: 60px;
    height: 60px;
  }
}

/* Mobile - Small Screens */
@media (max-width: 480px) {
  .chatbot {
    bottom: 16px;
    right: 16px;
    left: 16px;
  }
  
  .chat-toggle-button {
    width: 56px;
    height: 56px;
  }
  
  .chat-container {
    width: 100%;
    max-width: 100%;
    height: calc(100vh - 100px);
    max-height: calc(100vh - 100px);
    border-radius: 20px;
    position: fixed;
    bottom: 80px;
    right: 16px;
    left: 16px;
  }
  
  .chat-header {
    padding: 16px 20px;
  }
  
  .chat-title {
    font-size: 16px;
  }
  
  .chat-box {
    padding: 16px;
  }
  
  .user-content,
  .bot-content {
    max-width: 85%;
    font-size: 14px;
  }
  
  .input-container {
    padding: 12px 16px;
  }
  
  .message-input {
    padding: 10px 16px;
    font-size: 14px;
  }
  
  .send-button {
    width: 40px;
    height: 40px;
    min-width: 40px;
  }
}

/* Extra Small Screens */
@media (max-width: 360px) {
  .chat-title {
    font-size: 15px;
  }
  
  .user-content,
  .bot-content {
    font-size: 13px;
  }
  
  .message-input {
    font-size: 13px;
  }
}
</style>
