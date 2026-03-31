<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Product } from '../types/product';

const router = useRouter();

// 2. Define Component Props
const props = defineProps<{
  product: Product;
}>();

// 3. Derived State (Computed Properties)
// Calculate the original price if a discount exists, formatted to 2 decimal places
const originalPrice = computed(() => {
  if (!props.product.discountPercentage) return null;
  const orig = props.product.price / (1 - props.product.discountPercentage / 100);
  return orig.toFixed(2);
});

const currentPrice = computed(() => props.product.price.toFixed(2));

// Round the rating to the nearest whole number to display the correct number of filled stars
const roundedRating = computed(() => Math.round(props.product.rating));

const goToProductDetail = (): void => {
  router.push(`/product/${props.product.id}`);
};
</script>

<template>
  <div
    class="relative flex flex-col bg-surface-light dark:bg-surface-card-dark border border-border-light dark:border-border-dark rounded-lg p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    role="button"
    tabindex="0"
    @click="goToProductDetail"
    @keyup.enter="goToProductDetail"
    @keyup.space.prevent="goToProductDetail"
  >
    
    <div 
      v-if="product.discountPercentage" 
      class="absolute top-4 left-4 bg-brand-maroon text-white text-xs font-bold px-2 py-1 rounded-full z-10"
    >
      -{{ Math.round(product.discountPercentage) }}%
    </div>
    <div 
      v-else 
      class="absolute top-4 left-4 bg-brand-maroon text-white text-xs font-bold px-2 py-1 rounded-full z-10"
    >
      New
    </div>

    <div class="w-full h-48 mb-4 overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md">
      <img 
        :src="product.thumbnail" 
        :alt="product.title" 
        class="object-contain w-full h-full mix-blend-multiply dark:mix-blend-normal"
        loading="lazy"
      />
    </div>

    <div class="flex flex-col flex-grow text-center">
      
      <div class="flex justify-center space-x-1 mb-2">
        <svg 
          v-for="i in 5" 
          :key="i"
          class="w-4 h-4"
          :class="i <= roundedRating ? 'text-brand-peach' : 'text-gray-300 dark:text-gray-600'"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>

      <h3 class="text-sm font-medium text-text-light dark:text-text-dark line-clamp-2 mb-2 flex-grow">
        {{ product.title }}
      </h3>

      <div class="flex items-center justify-center space-x-2 mt-auto">
        <span class="text-lg font-bold text-text-light dark:text-text-dark">
          ${{ currentPrice }}
        </span>
        <span 
          v-if="originalPrice" 
          class="text-sm text-gray-500 dark:text-gray-400 line-through"
        >
          ${{ originalPrice }}
        </span>
      </div>
    </div>
  </div>
</template>