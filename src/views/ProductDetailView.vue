<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../stores/cart';
import type { Product } from '../types/product';

const route = useRoute();
const cartStore = useCartStore();

const product = ref<Product | null>(null);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);

const productImage = computed<string>(() => {
  if (!product.value) {
    return '';
  }

  return product.value.images[0] ?? product.value.thumbnail;
});

const originalPrice = computed<string | null>(() => {
  if (!product.value?.discountPercentage) {
    return null;
  }

  const original = product.value.price / (1 - product.value.discountPercentage / 100);
  return original.toFixed(2);
});

const currentPrice = computed<string>(() => {
  if (!product.value) {
    return '0.00';
  }

  return product.value.price.toFixed(2);
});

const addToCart = (): void => {
  if (!product.value) {
    return;
  }

  cartStore.addItem(product.value);
};

const fetchProductById = async (): Promise<void> => {
  const rawId = route.params.id;
  const id = Number(rawId);

  if (!Number.isInteger(id) || id <= 0) {
    error.value = 'Invalid product id.';
    isLoading.value = false;
    return;
  }

  try {
    isLoading.value = true;
    error.value = null;

    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Product = await response.json();
    product.value = data;
  } catch (caughtError) {
    error.value = caughtError instanceof Error ? caughtError.message : 'Failed to fetch product details.';
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => route.params.id,
  () => {
    fetchProductById();
  },
  { immediate: true },
);
</script>

<template>
  <section class="w-full">
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-maroon dark:border-brand-peach"></div>
    </div>

    <div v-else-if="error" class="text-center py-20 text-red-600 dark:text-red-400">
      <p class="text-xl font-bold">Could not load product details.</p>
      <p>{{ error }}</p>
    </div>

    <article
      v-else-if="product"
      class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start bg-surface-light dark:bg-surface-card-dark border border-border-light dark:border-border-dark rounded-2xl p-6 lg:p-10"
    >
      <div class="w-full bg-white p-8 rounded-lg flex items-center justify-center min-h-[320px] lg:min-h-[460px]">
        <img
          :src="productImage"
          :alt="product.title"
          class="w-full h-full object-contain max-h-[420px]"
          loading="eager"
        />
      </div>

      <div class="flex flex-col gap-4">
        <p class="text-sm uppercase tracking-widest text-brand-peach font-semibold">
          {{ product.category }}
        </p>

        <h1 class="text-3xl lg:text-4xl font-bold text-text-light dark:text-text-dark leading-tight">
          {{ product.title }}
        </h1>

        <div class="flex items-center gap-3">
          <span class="text-3xl font-bold text-text-light dark:text-text-dark">${{ currentPrice }}</span>
          <span
            v-if="originalPrice"
            class="text-lg text-gray-500 dark:text-gray-400 line-through"
          >
            ${{ originalPrice }}
          </span>
          <span
            v-if="product.discountPercentage"
            class="text-sm font-semibold bg-brand-maroon text-white px-3 py-1 rounded-full"
          >
            -{{ Math.round(product.discountPercentage) }}%
          </span>
        </div>

        <div class="flex items-center gap-3 text-sm text-text-light/80 dark:text-text-dark/80">
          <span>Rating: {{ product.rating.toFixed(1) }}</span>
          <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
          <span>Stock: {{ product.stock }}</span>
        </div>

        <p class="text-base leading-relaxed text-text-light dark:text-text-dark mt-2">
          {{ product.description }}
        </p>

        <button
          type="button"
          @click="addToCart"
          class="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold bg-brand-maroon hover:bg-brand-peach transition-colors duration-300 w-full sm:w-auto"
        >
          Add to Cart
        </button>
      </div>
    </article>
  </section>
</template>
