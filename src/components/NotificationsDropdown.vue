<template>
  <div class="absolute right-0 top-12 w-[300px] border border-line bg-white shadow-[0_4px_16px_rgba(0,0,0,0.15)]" data-testid="notifications-dropdown">
    <div v-if="!store.notifications.length" class="flex flex-col items-center gap-4 py-9 text-ink">
      <AppIcon name="bell" :size="40" class="text-brand" />
      <p class="text-[15px]">Nicio notificare încă</p>
    </div>
    <template v-else>
      <router-link v-for="n in store.notifications.slice(0, 3)" :key="n.id" :to="`/book/${n.bookId}`" @click="$emit('close')"
        class="flex gap-3 border-b border-line p-4 hover:bg-brand-soft">
        <span class="h-10 w-7 shrink-0 rounded-sm" :style="{ backgroundColor: getBook(n.bookId).bgColor }"></span>
        <span>
          <span class="block text-sm leading-snug">{{ n.text }}</span>
          <span class="mt-1 block text-xs text-muted">{{ n.time }}</span>
        </span>
      </router-link>
      <router-link to="/alerts" @click="$emit('close')" class="block py-3 text-center text-sm text-brand hover:underline" data-testid="see-all-notifications">
        Vezi toate notificările
      </router-link>
    </template>
  </div>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { store, getBook } from '@/stores/books'
defineEmits(['close'])
</script>
