<template>
  <div class="mx-auto max-w-[1240px] px-3 pt-5 pb-10" data-testid="alerts-page">
    <div class="max-w-[962px] border border-line">
      <h1 class="border-b border-line px-4 py-4 font-medium">Notificări</h1>
      <div v-if="!store.notifications.length" class="flex flex-col items-center gap-4 py-16">
        <AppIcon name="bell" :size="40" class="text-brand" />
        <p>Nicio notificare încă</p>
      </div>
      <div v-for="n in store.notifications" :key="n.id" class="flex items-center gap-4 border-b border-line px-4 py-4 last:border-0" :data-testid="`notification-${n.id}`">
        <router-link :to="`/book/${n.bookId}`" class="h-16 w-11 shrink-0 overflow-hidden rounded-sm">
          <BookCover :book="getBook(n.bookId)" :badges="false" class="text-[0px]" />
        </router-link>
        <div class="flex-1">
          <p>{{ n.text }}</p>
          <p class="mt-1 text-sm text-muted">{{ n.time }}</p>
        </div>
        <button @click="remove(n.id)" class="text-muted hover:text-brand" :data-testid="`notification-dismiss-${n.id}`"><AppIcon name="close" :size="18" /></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'
import BookCover from '@/components/BookCover.vue'
import { store, getBook } from '@/stores/books'
const remove = (id) => { store.notifications = store.notifications.filter((n) => n.id !== id) }
</script>
