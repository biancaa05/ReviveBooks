<template>
  <div class="group" :data-testid="`book-card-${book.id}`">
    <div class="relative aspect-[2/3] overflow-hidden rounded-[3px]">
      <router-link :to="`/book/${book.id}`" class="block h-full transition-transform duration-300 group-hover:scale-[1.02]">
        <BookCover :book="book" />
      </router-link>
      <button @click="toggleFav(book.id)" :data-testid="`fav-btn-${book.id}`"
        class="absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs text-ink shadow-sm transition-transform hover:scale-105">
        <AppIcon name="heart" :size="16" :fill="isFav(book.id)" :class="isFav(book.id) ? 'text-[#e5484d]' : ''" />
        {{ book.likes }}
      </button>
    </div>
    <router-link :to="`/book/${book.id}`" class="block px-1 pt-2">
      <div class="flex items-start justify-between gap-2 text-xs text-muted">
        <span class="truncate">{{ book.author }}</span>
        <span v-if="book.isPremium" class="shrink-0 text-ink">{{ $t('book.promoted') }}</span>
      </div>
      <p class="truncate text-xs text-muted">{{ book.title }} · {{ $t(`condition.${book.condition}`, book.condition) }}</p>
      <p class="mt-2 text-xs text-muted truncate">{{ $t('book.wants') }}: {{ book.wants }}</p>
      <p class="flex items-center gap-1 text-[15px] text-brand" data-testid="book-swap-label">
        {{ $t('book.swap') }} <span class="text-xs">{{ $t('book.free') }}</span> <AppIcon name="shield" :size="13" />
      </p>
    </router-link>
  </div>
</template>

<script setup>
import BookCover from './BookCover.vue'
import AppIcon from './AppIcon.vue'
import { toggleFav, isFav } from '@/stores/books'
defineProps({ book: Object })
</script>
