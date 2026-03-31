<script setup lang="ts">
// 1. Define the exact props this component needs
defineProps<{
  categories: string[];
  selectedCategory: string;
}>();

// 2. Define the exact events this component can emit
defineEmits<{
  (e: 'select', category: string): void;
}>();
</script>

<template>
  <div class="flex flex-wrap justify-center gap-3 mb-10">
    <button
      v-for="category in categories"
      :key="category"
      @click="$emit('select', category)"
      class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border capitalize"
      :class="[
        selectedCategory === category 
          ? 'bg-brand-maroon text-white border-brand-maroon dark:bg-brand-peach dark:text-surface-dark dark:border-brand-peach shadow-md' 
          : 'bg-transparent text-text-light border-border-light hover:border-brand-peach dark:text-text-dark dark:border-border-dark dark:hover:border-brand-peach'
      ]"
    >
      {{ category }}
    </button>
  </div>
</template>