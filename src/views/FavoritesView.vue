<template>
  <div class="mx-auto max-w-[1240px] px-3 pt-11 pb-10" data-testid="favorites-page">
    <p class="mb-2 text-xs text-[#4d4d4d]">Recomandat</p>
    <div class="flex h-[200px] max-w-[970px] items-center justify-between rounded bg-[#e3e6e5] px-10 md:h-[277px]" data-testid="promo-banner">
      <div>
        <p class="text-2xl font-medium text-brand">Clubul de lectură al lunii</p>
        <p class="mt-2 max-w-md text-[#4d4d4d]">Descoperă cele mai schimbate cărți din comunitatea ReviveBooks.</p>
      </div>
    </div>
    <h1 class="mt-14 mb-6 text-[22px] font-semibold">Cărți adăugate în Favorite</h1>
    <div v-if="favs.length" class="grid max-w-[970px] grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
      <BookCard v-for="b in favs" :key="b.id" :book="b" />
    </div>
    <div v-else class="py-16 text-muted" data-testid="favorites-empty">
      Nu ai încă nicio carte favorită. <router-link to="/" class="text-brand hover:underline">Descoperă cărți</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BookCard from '@/components/BookCard.vue'
import { store, getBook } from '@/stores/books'
const favs = computed(() => store.favorites.map(getBook))
</script>
