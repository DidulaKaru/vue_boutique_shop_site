import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/vue-boutique-spa/',
  plugins: [
    vue(),
    tailwindcss(),
  ],
})