import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets load properly on GitHub Pages and any subpath
  server: {
    host: true,
    port: 5173,
    allowedHosts: true
  }
})
