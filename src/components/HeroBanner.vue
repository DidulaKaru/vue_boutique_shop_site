<script setup lang="ts">
const bannerUrl = `${import.meta.env.BASE_URL}banner.jpg`;
</script>

<template>
  <section
    class="relative overflow-hidden"
    :style="{ backgroundImage: `url(${bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <div class="absolute inset-0 bg-black/60"></div>

    <div class="relative mx-auto flex min-h-[50vh] max-w-7xl items-center px-4 py-16 sm:px-6 md:min-h-[58vh] md:py-24 lg:px-8">
      <div class="max-w-2xl">
        <h1 class="font-serif text-4xl leading-tight text-brand-peach sm:text-5xl md:text-6xl">
          The Flying Dutchman
        </h1>
        <p class="mt-5 text-base leading-relaxed text-white/95 sm:text-lg md:text-xl">
          A premium boutique in the historic Galle Dutch Fort, The Flying Dutchman presents a curated world of arts,
          fragrances, and apparel crafted for refined everyday living.
        </p>
      </div>
    </div>
  </section>
</template>
