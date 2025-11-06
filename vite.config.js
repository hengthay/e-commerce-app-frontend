import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Proxy server
  server: {
    proxy: {
      '/payments': 'http://localhost:3000',
      '/orders': 'http://localhost:3000'
    }
  }
})
