<template>
  <div v-if="book" class="bg-[#f5f6f5] pb-12" data-testid="book-page">
    <div class="mx-auto max-w-[1240px] px-3 pt-5">
      <p class="mb-4 text-xs text-muted">
        <router-link to="/" class="text-brand hover:underline">Acasă</router-link> /
        <router-link :to="{ path: '/', query: { cat: book.category } }" class="text-brand hover:underline">{{ book.category }}</router-link> / {{ book.title }}
      </p>
      <div class="grid gap-6 md:grid-cols-[1fr_360px]">
        <div class="grid grid-cols-2 gap-1">
          <div class="aspect-[2/3]"><BookCover :book="book" large /></div>
          <div class="flex aspect-[2/3] flex-col justify-between p-8 text-white" :style="{ backgroundColor: book.bgColor }">
            <p class="text-sm leading-relaxed text-white/80">{{ book.description }}</p>
            <p class="text-xs uppercase tracking-[0.25em] text-white/60">{{ book.author }}</p>
          </div>
        </div>

        <aside class="flex flex-col gap-3">
          <div class="bg-white p-5">
            <h1 class="text-xl font-medium" data-testid="book-title">{{ book.title }}</h1>
            <p class="text-sm text-muted">{{ book.author }} · {{ book.condition }}</p>
            <p class="mt-3 flex items-center gap-1 text-xl text-brand">Schimb gratuit <AppIcon name="shield" :size="18" /></p>
            <dl class="mt-4 grid grid-cols-2 gap-y-2 border-y border-line py-4 text-sm">
              <template v-for="row in rows" :key="row[0]">
                <dt class="text-muted">{{ row[0] }}</dt><dd>{{ row[1] }}</dd>
              </template>
            </dl>
            <p class="mt-4 text-sm"><span class="text-muted">Vrea în schimb:</span> {{ book.wants }}</p>

            <template v-if="!mine">
              <div v-if="proposing" class="mt-4 rounded border border-line p-3" data-testid="swap-offer-panel">
                <p class="mb-2 text-sm font-medium">Ce carte oferi în schimb?</p>
                <select v-model="offer" class="w-full rounded border border-line px-2 py-2 text-sm" data-testid="swap-offer-select">
                  <option v-for="m in myBooks" :key="m.id" :value="m.title">{{ m.title }}</option>
                </select>
                <button @click="propose" :disabled="!offer" class="mt-3 w-full rounded bg-brand py-2.5 text-sm text-white hover:bg-brand-dark disabled:opacity-50" data-testid="swap-offer-submit">Trimite propunerea</button>
              </div>
              <button v-else @click="startProposal" class="mt-5 w-full rounded bg-brand py-2.5 text-sm text-white transition-colors hover:bg-brand-dark" data-testid="propose-swap-btn">
                Propune un schimb
              </button>
              <button @click="message" class="mt-2 w-full rounded border border-brand py-2.5 text-sm text-brand hover:bg-brand-soft" data-testid="message-owner-btn">Trimite un mesaj</button>
            </template>
            <button @click="toggleFav(book.id)" class="mt-2 flex w-full items-center justify-center gap-2 rounded border border-line py-2.5 text-sm hover:bg-brand-soft" data-testid="book-fav-btn">
              <AppIcon name="heart" :size="16" :fill="isFav(book.id)" :class="isFav(book.id) ? 'text-[#e5484d]' : ''" />
              {{ isFav(book.id) ? 'Adăugată la favorite' : 'Favorite' }} · {{ book.likes }}
            </button>
          </div>
          <div class="flex items-center gap-3 bg-white p-5" data-testid="owner-card">
            <span class="flex h-12 w-12 items-center justify-center rounded-full bg-leaf text-lg text-white uppercase">{{ book.owner[0] }}</span>
            <div>
              <p class="font-medium">{{ book.owner }}</p>
              <p class="flex text-[#ffb703]"><AppIcon v-for="i in 5" :key="i" name="star" :size="14" fill /><span class="ml-1 text-xs text-muted">(24)</span></p>
            </div>
          </div>
        </aside>
      </div>

      <h2 v-if="others.length" class="mt-10 mb-5 text-xl font-semibold">Alte cărți de la {{ book.owner }}</h2>
      <BookGrid :books="others" />
    </div>
  </div>
  <p v-else class="py-24 text-center text-muted">Cartea nu a fost găsită.</p>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '@/components/AppIcon.vue'
import BookCover from '@/components/BookCover.vue'
import BookGrid from '@/components/BookGrid.vue'
import { store, getBook, isFav, toggleFav, startSwap } from '@/stores/books'

const route = useRoute()
const router = useRouter()
const proposing = ref(false)
const offer = ref('')
const book = computed(() => getBook(route.params.id))
const mine = computed(() => book.value.owner === store.me)
const myBooks = computed(() => store.books.filter((b) => b.owner === store.me))
const others = computed(() => store.books.filter((b) => b.owner === book.value.owner && b.id !== book.value.id))
const rows = computed(() => [['Gen', book.value.category], ['Stare', book.value.condition], ['Limba', book.value.language], ['An apariție', book.value.year], ['Încărcat', book.value.added]])

watch(() => route.params.id, () => { proposing.value = false })
const startProposal = () => { store.loggedIn = true; proposing.value = true; offer.value = myBooks.value[0]?.title || '' }
const propose = () => router.push(`/chat/${startSwap(book.value, offer.value)}`)
const message = () => { store.loggedIn = true; router.push(`/chat/${startSwap(book.value)}`) }
</script>
