<template>
  <span class="flex items-center justify-center overflow-hidden rounded-full bg-brand font-medium text-white" data-testid="user-avatar">
    <img v-if="store.avatar" :src="store.avatar" alt="" class="h-full w-full object-cover" />
    <template v-else>{{ store.me[0].toUpperCase() }}</template>
  </span>
</template>

<script setup>
import { store } from '@/stores/books'
</script>
