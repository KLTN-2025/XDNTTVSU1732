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
      <!-- Header with close button -->
      <div class="chat-header">
        <!-- <div class="header-content">
          <div class="bot-status">
            <div class="status-dot"></div>
            <h3 class="chat-title">AI Assistant</h3>
          </div>
          <span class="status-text">Online</span>
        </div> -->
        <button @click="toggleChat" class="close-button" title="Đóng chat">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      <!-- Chat Messages -->
      <div class="chat-box" ref="chatBox">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <div v-if="message.role === 'user'" class="user-message">
            <div class="message-content">{{ message.content }}</div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
          <div v-if="message.role === 'bot'" class="bot-message">
            <div class="bot-avatar">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <div class="message-wrapper">
              <div class="message-content" v-html="convertMarkdown(message.content)"></div>
              <div class="message-time">{{ formatTime(message.timestamp) }}</div>
            </div>
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isTyping" class="bot-message typing-indicator">
          <div class="bot-avatar">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
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
            placeholder="Nhập tin nhắn..." 
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
      messages: [
        { 
          role: "bot", 
          content: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?",
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
          message: messageContent
        });
        
        if (response.data.message_content) {
          this.messages.push({ 
            role: "bot", 
            content: response.data.message_content,
            timestamp: new Date()
          });
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
      let htmlContent = marked(content);

      // Apply custom classes to the generated HTML
      htmlContent = htmlContent.replace(/<p>/g, '<p class="markdown-p">');
      htmlContent = htmlContent.replace(/<strong>/g, '<strong class="markdown-strong">');
      htmlContent = htmlContent.replace(/<em>/g, '<em class="markdown-em">');
      htmlContent = htmlContent.replace(/<a /g, '<a class="markdown-link" target="_blank" rel="noopener noreferrer" ');
      htmlContent = htmlContent.replace(/<h1>/g, '<h1 class="markdown-h1">');
      htmlContent = htmlContent.replace(/<h2>/g, '<h2 class="markdown-h2">');
      htmlContent = htmlContent.replace(/<h3>/g, '<h3 class="markdown-h3">');
      htmlContent = htmlContent.replace(/<ul>/g, '<ul class="markdown-ul">');
      htmlContent = htmlContent.replace(/<ol>/g, '<ol class="markdown-ol">');
      htmlContent = htmlContent.replace(/<li>/g, '<li class="markdown-li">');
      htmlContent = htmlContent.replace(/<code>/g, '<code class="markdown-code">');
      htmlContent = htmlContent.replace(/<pre>/g, '<pre class="markdown-pre">');
      htmlContent = htmlContent.replace(/<blockquote>/g, '<blockquote class="markdown-blockquote">');
      htmlContent = htmlContent.replace(/<img /g, '<img class="markdown-img" ');

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
.chatbot {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.chat-toggle-button:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
}

.chat-toggle-button:active {
  transform: scale(0.95);
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  }
  50% {
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.6);
  }
}

/* Chat Container */
.chat-container {
  width: 400px;
  height: 600px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Header */
.chat-header {
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bot-status {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-dot {
width: 10px;
  height: 10px;
  background: #4ade80;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.3);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.chat-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.status-text {
 font-size: 12px;
  opacity: 0.9;
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.close-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: red;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

/* Chat Messages */
.chat-box {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%);
  scroll-behavior: smooth;
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
  margin-bottom: 20px;
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
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

.user-message .message-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 14px 18px;
  border-radius: 20px 20px 4px 20px;
  max-width: 80%;
  word-wrap: break-word;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
  font-size: 15px;
  line-height: 1.5;
}

/* Bot Messages */
.bot-message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.bot-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.message-wrapper {
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 48px);
}

.bot-message .message-content {
  background: white;
  color: #1e293b;
  padding: 14px 18px;
  border-radius: 20px 20px 20px 4px;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  font-size: 15px;
  line-height: 1.6;
  max-width: 100%;
}

/* Markdown Styles */
.markdown-p {
  margin: 8px 0;
  line-height: 1.6;
  word-break: break-word;
  overflow-wrap: break-word;
}

.markdown-strong {
  font-weight: 600;
  color: #667eea;
}

.markdown-em {
  font-style: italic;
  color: #f97316;
}

.markdown-link {
  color: #667eea;
  text-decoration: underline;
  font-weight: 500;
  transition: color 0.2s;
  word-break: break-word;
  overflow-wrap: break-word;
}

.markdown-link:hover {
  color: #764ba2;
}

.markdown-h1 {
  font-size: 1.5em;
  font-weight: 700;
  margin: 16px 0 12px 0;
  color: #0f172a;
}

.markdown-h2 {
  font-size: 1.3em;
  font-weight: 600;
  margin: 14px 0 10px 0;
  color: #1e293b;
}

.markdown-h3 {
  font-size: 1.1em;
  font-weight: 600;
  margin: 12px 0 8px 0;
  color: #334155;
}

.markdown-ul,
.markdown-ol {
  margin: 12px 0;
  padding-left: 24px;
}

.markdown-ul {
  list-style-type: disc;
}

.markdown-ol {
  list-style-type: decimal;
}

.markdown-li {
  margin: 6px 0;
  line-height: 1.6;
  word-break: break-word;
  overflow-wrap: break-word;
}

.markdown-code {
  background: #f1f5f9;
  color: #e11d48;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'Courier New', monospace;
}

.markdown-pre {
  background: #1e293b;
  color: #e2e8f0;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 12px 0;
}

.markdown-pre .markdown-code {
  background: transparent;
  color: inherit;
  padding: 0;
}

.markdown-blockquote {
  border-left: 4px solid #667eea;
  padding-left: 16px;
  margin: 12px 0;
  color: #64748b;
  font-style: italic;
}

.markdown-img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 12px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Message Time */
.message-time {
  font-size: 11px;
  color: #64748b;
  margin-top: 6px;
}

.user-message .message-time {
  text-align: right;
}

.bot-message .message-time {
  margin-left: 0;
}

/* Typing Indicator */
.typing-indicator {
  align-items: center;
}

.typing-dots {
  display: flex;
  gap: 6px;
  background: white;
  padding: 16px 20px;
  border-radius: 20px 20px 20px 4px;
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

.typing-dots span:nth-child(1) { 
  animation-delay: -0.32s; 
}

.typing-dots span:nth-child(2) { 
  animation-delay: -0.16s; 
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Input Container */
.input-container {
  padding: 20px;
  border-top: 1px solid #e2e8f0;
  background: white;
}

.input-wrapper {
  display: flex;
  gap: 10px;
  align-items: center;
}

.message-input {
  flex: 1;
  padding: 14px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 24px;
  font-size: 15px;
  outline: none;
  transition: all 0.2s;
  background: #f8fafc;
}

.message-input:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.message-input:disabled {
  background: #f1f5f9;
  cursor: not-allowed;
  opacity: 0.6;
}

.send-button {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.send-button:hover:not(:disabled) {
  transform: scale(1.08);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.send-button:active:not(:disabled) {
  transform: scale(0.95);
}

.send-button:disabled {
  background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Loading Spinner */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 480px) {
  .chatbot {
    bottom: 16px;
    right: 16px;
  }

  .chat-toggle-button {
    width: 56px;
    height: 56px;
  }

  .chat-container {
    width: calc(100vw - 32px);
    height: calc(100vh - 80px);
    position: fixed;
    top: 40px;
    left: 16px;
    right: 16px;
    bottom: 40px;
    width: auto;
    height: auto;
    border-radius: 16px;
  }

  .chat-header {
 background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .chat-box {
    padding: 16px;
  }

  .input-container {
    padding: 16px;
  }

  .user-message .message-content,
  .bot-message .message-content {
    max-width: 85%;
    font-size: 14px;
  }
}

@media (max-width: 360px) {
  .chat-title {
    font-size: 16px;
  }

  .message-input {
    font-size: 14px;
    padding: 12px 16px;
  }

  .send-button {
    width: 44px;
    height: 44px;
  }
}
</style>