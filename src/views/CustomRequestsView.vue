<script setup lang="ts">
import { ref } from 'vue';

interface CustomRequestForm {
  name: string;
  email: string;
  requestType: 'Woodwork' | 'Textiles' | 'Paintings' | 'Other';
  details: string;
}

const initialFormState = (): CustomRequestForm => ({
  name: '',
  email: '',
  requestType: 'Woodwork',
  details: '',
});

const form = ref<CustomRequestForm>(initialFormState());
const successMessage = ref<string>('');

const submitRequest = (): void => {
  successMessage.value = 'Thank you! Our artisans will review your request.';
  form.value = initialFormState();
};
</script>

<template>
  <section class="w-full max-w-3xl mx-auto">
    <div class="text-center mb-8">
      <p class="text-brand-peach font-serif italic text-lg mb-1">Tailored For You</p>
      <h1 class="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark uppercase tracking-wide">
        Custom Requests
      </h1>
      <div class="w-16 h-1 bg-brand-maroon mx-auto mt-4 rounded-full"></div>
      <p class="mt-4 text-text-light/80 dark:text-text-dark/80">
        Tell us what local art or craft you are looking for, and our artisans will follow up.
      </p>
    </div>

    <form
      class="bg-surface-light dark:bg-surface-card-dark border border-border-light dark:border-border-dark rounded-2xl p-6 md:p-8 space-y-5"
      @submit.prevent="submitRequest"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="name" class="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark px-4 py-2.5 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand-peach"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark px-4 py-2.5 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand-peach"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label for="requestType" class="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">Request Type</label>
        <select
          id="requestType"
          v-model="form.requestType"
          class="w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark px-4 py-2.5 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand-peach"
        >
          <option value="Woodwork">Woodwork</option>
          <option value="Textiles">Textiles</option>
          <option value="Paintings">Paintings</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label for="details" class="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">Details</label>
        <textarea
          id="details"
          v-model="form.details"
          required
          rows="5"
          class="w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark px-4 py-2.5 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand-peach"
          placeholder="Describe the item, style, size, colors, budget, and timeline."
        ></textarea>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
        <p v-if="successMessage" class="text-sm font-medium text-green-600 dark:text-green-400">
          {{ successMessage }}
        </p>
        <button
          type="submit"
          class="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold bg-brand-maroon hover:bg-brand-peach transition-colors duration-300 w-full sm:w-auto"
        >
          Submit Request
        </button>
      </div>
    </form>
  </section>
</template>
