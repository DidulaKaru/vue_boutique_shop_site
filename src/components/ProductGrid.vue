<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import FilterBar from './FilterBar.vue';
import ProductCard from './ProductCard.vue';
import type { DummyJSONProductsResponse, Product } from '../types/product';

const products = ref<Product[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);
const selectedCategory = ref<string>('All');

const categories = computed<string[]>(() => {
	const uniqueCategories = new Set(products.value.map((product) => product.category));
	return ['All', ...Array.from(uniqueCategories)];
});

const filteredProducts = computed<Product[]>(() => {
	if (selectedCategory.value === 'All') {
		return products.value;
	}

	return products.value.filter((product) => product.category === selectedCategory.value);
});

const handleCategorySelect = (category: string): void => {
	selectedCategory.value = category;
};

const curatedCategories = new Set<string>([
	'home-decoration',
	'womens-dresses',
	'womens-bags',
	'womens-jewellery',
	'mens-shirts',
	'sunglasses',
	'fragrances',
]);

const fetchProducts = async (): Promise<void> => {
	try {
		isLoading.value = true;
		error.value = null;

		const response = await fetch('https://dummyjson.com/products?limit=100');

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: DummyJSONProductsResponse = await response.json();
		const curatedProducts = data.products.filter((product) => curatedCategories.has(product.category));
		products.value = curatedProducts;
	} catch (caughtError) {
		error.value = caughtError instanceof Error ? caughtError.message : 'Failed to fetch products.';
	} finally {
		isLoading.value = false;
	}
};

onMounted(() => {
	fetchProducts();
});
</script>

<template>
	<section class="w-full">
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

		<div v-else-if="error" class="text-center py-20 text-red-600 dark:text-red-400">
			<p class="text-xl font-bold">Oops! Something went wrong.</p>
			<p>{{ error }}</p>
		</div>

		<template v-else>
			<FilterBar
				:categories="categories"
				:selected-category="selectedCategory"
				@select="handleCategorySelect"
			/>

			<div v-if="filteredProducts.length === 0" class="text-center py-12 text-text-light dark:text-text-dark">
				<p class="text-lg font-medium">No products found in this category.</p>
			</div>

			<div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				<ProductCard
					v-for="product in filteredProducts"
					:key="product.id"
					:product="product"
				/>
			</div>
		</template>
	</section>
</template>
