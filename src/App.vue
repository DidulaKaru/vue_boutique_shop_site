<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import ProductGrid from './components/ProductGrid.vue';
</script>

<template>
  <div class="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors duration-300">
    <NavBar />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProductGrid />
    </main>
  </div>
</template>