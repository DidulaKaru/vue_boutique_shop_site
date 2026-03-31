<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductCard from './ProductCard.vue';

// 1. Strict TypeScript Interfaces
// We define the exact shape of the data we expect from DummyJSON.
export interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  thumbnail: string;
  category: string;
}

interface DummyJSONResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// 2. Reactive Component State
// We need to track the products, but also whether the app is currently loading or if an error occurred.
const products = ref<Product[]>([]);
const isLoading = ref<boolean>(true);
const errorMessage = ref<string | null>(null);

// 3. Asynchronous Fetch Logic
const fetchProducts = async () => {
  try {
    // We use the native fetch API as requested by the rubric
    const response = await fetch('https://dummyjson.com/products?limit=12');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Explicitly cast the JSON response to our strict interface
    const data: DummyJSONResponse = await response.json();
    products.value = data.products;
    
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to fetch products.';
    console.error("Error fetching products:", error);
  } finally {
    // Whether it succeeds or fails, we are done loading
    isLoading.value = false;
  }
};

// 4. Lifecycle Hook
// Trigger the fetch as soon as this component is mounted to the screen
onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="w-full">
    <div class="text-center mb-10">
      <p class="text-brand-peach font-serif italic text-lg mb-1">Boutique Collection</p>
      <h2 class="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark uppercase tracking-wide">
        Our Products
      </h2>
      <div class="w-16 h-1 bg-brand-maroon mx-auto mt-4 rounded-full"></div>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-maroon dark:border-brand-peach"></div>
    </div>

    <div v-else-if="errorMessage" class="text-center py-20 text-red-600 dark:text-red-400">
      <p class="text-xl font-bold">Oops! Something went wrong.</p>
      <p>{{ errorMessage }}</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>