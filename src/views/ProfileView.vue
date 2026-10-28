<template>
  <div class="mx-auto max-w-[1240px] px-3 pt-8 pb-10" data-testid="profile-page">
    <div class="flex flex-col gap-8 sm:flex-row">
      <span class="flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-brand text-6xl text-white">B</span>
      <div class="flex-1">
        <h1 class="text-2xl font-semibold" data-testid="profile-username">{{ store.me }}</h1>
        <p class="mt-1 flex items-center text-[#ffb703]"><AppIcon v-for="i in 5" :key="i" name="star" :size="18" fill /><span class="ml-2 text-sm text-muted">12 evaluări</span></p>
        <div class="mt-6 grid gap-2 border-t border-line pt-4 text-sm text-[#4d4d4d] sm:grid-cols-2">
          <p class="flex items-center gap-2"><AppIcon name="pin" :size="18" /> București, România</p>
          <p class="flex items-center gap-2"><AppIcon name="clock" :size="18" /> Online acum</p>
          <p class="flex items-center gap-2"><AppIcon name="swap" :size="18" /> {{ swaps }} schimburi finalizate</p>
          <p class="flex items-center gap-2"><AppIcon name="check" :size="18" /> E-mail verificat</p>
        </div>
      </div>
    </div>

    <div class="mt-10 flex gap-6 border-b border-line">
      <button v-for="t in tabs" :key="t" @click="tab = t" :data-testid="`profile-tab-${t}`"
        :class="['-mb-px border-b-2 pb-3 transition-colors', tab === t ? 'border-brand text-brand' : 'border-transparent text-[#4d4d4d]']">{{ t }}</button>
    </div>

    <div class="mt-6">
      <template v-if="tab === 'Cărți'">
        <p class="mb-5 text-sm text-muted">{{ mine.length }} cărți disponibile pentru schimb</p>
        <BookGrid :books="mine" />
      </template>
      <div v-else class="max-w-2xl divide-y divide-line" data-testid="profile-reviews">
        <div v-for="r in reviews" :key="r.user" class="py-4">
          <p class="font-medium">{{ r.user }}</p>
          <p class="text-[#4d4d4d]">{{ r.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import BookGrid from '@/components/BookGrid.vue'
import { store } from '@/stores/books'
import reviews from '@/data/reviews.json'

const tabs = ['Cărți', 'Evaluări']
const tab = ref('Cărți')
const swaps = 8
const mine = computed(() => store.books.filter((b) => b.owner === store.me))
</script>
