<template>
  <div class="relative flex h-full w-full items-center justify-center overflow-hidden p-4 text-center text-white"
    :style="{ backgroundColor: book.bgColor }" data-testid="book-cover">
    <div class="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/30 to-transparent"></div>
    <div class="absolute inset-x-5 top-5 h-px bg-white/25"></div>
    <div class="absolute inset-x-5 bottom-12 h-px bg-white/25"></div>
    <span v-if="book.isPremium && badges" class="absolute top-2.5 left-2.5 rounded bg-[#ffb703] px-2 py-0.5 text-[11px] font-bold text-black">Top</span>
    <span v-if="badges" class="absolute bottom-2.5 left-2.5 rounded bg-black/60 px-2 py-0.5 text-[11px]">{{ book.condition }}</span>
    <div>
      <p :class="[large ? 'text-3xl' : 'text-[15px]', 'font-bold leading-snug line-clamp-3']">{{ book.title }}</p>
      <p v-if="large" class="mt-3 text-sm uppercase tracking-[0.2em] text-white/75">{{ book.author }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({ book: Object, large: Boolean, badges: { type: Boolean, default: true } })
</script>
