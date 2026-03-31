<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useCartStore } from '../stores/cart';

const isDarkMode = ref(false);
const cartStore = useCartStore();

const cartTotalFormatted = computed<string>(() => cartStore.cartTotal.toFixed(2));
const cartItemCount = computed<number>(() => cartStore.cartItemCount);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  if (localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>

<template>
  <header class="bg-brand-maroon dark:bg-surface-card-dark text-white transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        
        <div class="flex-shrink-0 flex items-center">
          <RouterLink to="/" class="text-3xl font-serif italic tracking-wider">
            <span class="text-brand-peach text-4xl">Flying</span> Dutchman
          </RouterLink>
        </div>

        <nav class="hidden md:flex space-x-8 text-sm font-medium">
          <RouterLink to="/" class="hover:text-brand-peach transition-colors">Home</RouterLink>
          <RouterLink to="/" class="hover:text-brand-peach transition-colors">Shop</RouterLink>
          <a href="#" class="hover:text-brand-peach transition-colors">Custom Requests</a>
        </nav>

        <div class="flex items-center space-x-5 text-sm">
          <button class="hover:text-brand-peach transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </button>

          <div class="flex items-center space-x-2 cursor-pointer hover:text-brand-peach transition-colors">
            <div class="relative">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <span
                v-if="cartItemCount > 0"
                class="absolute -top-2 -right-2 min-w-4 h-4 px-1 rounded-full bg-brand-peach text-surface-dark text-[10px] font-bold flex items-center justify-center"
              >
                {{ cartItemCount }}
              </span>
            </div>
            <span>${{ cartTotalFormatted }}</span>
          </div>

          <div class="w-px h-6 bg-white/30"></div>

          <button @click="toggleTheme" class="hover:text-brand-peach transition-colors">
            <svg v-if="isDarkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
          </button>
        </div>

      </div>
    </div>
  </header>
</template>