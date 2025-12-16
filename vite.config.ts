import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
    allowedHosts: ['34cb-116-204-144-171.ngrok-free.app']
  }
}) 