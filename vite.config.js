import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // define: {
  //   'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(process.env.VITE_GEMINI_API_KEY),
  // },
})
