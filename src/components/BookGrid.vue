<template>
  <div class="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5" data-testid="book-grid">
    <BookCard v-for="book in books" :key="book.id" :book="book" :own="own" @delete="$emit('delete', $event)" />
  </div>
</template>

<script setup>
import BookCard from './BookCard.vue'
defineProps({ books: Array, own: Boolean })
defineEmits(['delete'])
</script>
