import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { jsonDbPlugin } from './vite-plugin-db.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), jsonDbPlugin()],
  server: {
    allowedHosts: true,
    watch: {
      ignored: ['**/data/**', '**/server/**', '**/data/db.json', '**/db.json'],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
