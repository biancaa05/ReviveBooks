<template>
  <div class="relative flex h-full w-full items-center justify-center overflow-hidden text-center text-white" data-testid="book-cover">
    <template v-if="hasImage">
      <img :src="book.images[0]" :alt="book.title" class="h-full w-full object-cover" />
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-10 pb-3 px-3">
        <p :class="[large ? 'text-2xl' : 'text-[14px]', 'font-bold leading-tight line-clamp-2 drop-shadow']">{{ book.title }}</p>
        <p v-if="large" class="mt-1 text-xs uppercase tracking-[0.2em] text-white/85">{{ book.author }}</p>
      </div>
    </template>
    <template v-else>
      <div class="absolute inset-0 flex items-center justify-center p-4" :style="{ backgroundColor: book.bgColor || '#043c25' }">
        <div class="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/30 to-transparent"></div>
        <div class="absolute inset-x-5 top-5 h-px bg-white/25"></div>
        <div class="absolute inset-x-5 bottom-12 h-px bg-white/25"></div>
        <div>
          <p :class="[large ? 'text-3xl' : 'text-[15px]', 'font-bold leading-snug line-clamp-3']">{{ book.title }}</p>
          <p v-if="large" class="mt-3 text-sm uppercase tracking-[0.2em] text-white/75">{{ book.author }}</p>
        </div>
      </div>
    </template>
    <span v-if="book.isPremium && badges" class="absolute top-2.5 left-2.5 rounded bg-[#ffb703] px-2 py-0.5 text-[11px] font-bold text-black">Top</span>
    <span v-if="badges && book.condition" class="absolute bottom-2.5 left-2.5 rounded bg-black/60 px-2 py-0.5 text-[11px] text-white">{{ $t(`condition.${book.condition}`, book.condition) }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ book: Object, large: Boolean, badges: { type: Boolean, default: true } })
const hasImage = computed(() => Array.isArray(props.book?.images) && props.book.images.length > 0 && props.book.images[0])
</script>
