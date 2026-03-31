import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import type { Product } from '../types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_STORAGE_KEY = 'boutique-shop-cart-items';

export const useCartStore = defineStore('cart', () => {
  const loadInitialItems = (): CartItem[] => {
    if (typeof window === 'undefined') {
      return [];
    }

    const raw = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    try {
      const parsed: unknown = JSON.parse(raw);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed as CartItem[];
    } catch {
      return [];
    }
  };

  const items = ref<CartItem[]>(loadInitialItems());

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

  watch(
    items,
    (nextItems) => {
      if (typeof window === 'undefined') {
        return;
      }

      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextItems));
    },
    { deep: true },
  );

  return {
    items,
    addItem,
    cartTotal,
    cartItemCount,
  };
});
