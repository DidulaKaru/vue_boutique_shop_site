import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/vue_boutique_shop_site/',
  plugins: [
    vue(),
    tailwindcss(),
  ],
})