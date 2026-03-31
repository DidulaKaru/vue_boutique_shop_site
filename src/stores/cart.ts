import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Product } from '../types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  const addItem = (product: Product): void => {
    const existingItem = items.value.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      return;
    }

    items.value.push({
      product,
      quantity: 1,
    });
  };

  const cartTotal = computed<number>(() => {
    return items.value.reduce((total, item) => total + item.product.price * item.quantity, 0);
  });

  const cartItemCount = computed<number>(() => {
    return items.value.reduce((count, item) => count + item.quantity, 0);
  });

  return {
    items,
    addItem,
    cartTotal,
    cartItemCount,
  };
});
