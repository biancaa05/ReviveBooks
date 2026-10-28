<template>
  <div data-testid="home-page">
    <section v-if="!store.loggedIn && !filtered" class="relative h-[460px] bg-cover bg-center md:h-[624px]" data-testid="hero-section"
      style="background-image: url('https://images.unsplash.com/photo-1655584207245-44c66fc27e54?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000')">
      <div class="mx-auto flex h-full max-w-[1240px] items-center px-3">
        <div class="w-full max-w-[384px] rounded-lg bg-white p-8 shadow-sm">
          <h1 class="text-2xl leading-snug font-medium">{{ $t('home.hero_title') }}</h1>
          <router-link to="/login" class="mt-8 block rounded bg-brand py-3 text-center text-white transition-colors hover:bg-brand-dark" data-testid="hero-add-book-btn">
            {{ $t('home.hero_cta') }}
          </router-link>
          <a href="#cum-functioneaza" @click.prevent="how = !how" class="mt-6 block text-center font-medium text-brand hover:underline" data-testid="hero-how-it-works">
            {{ $t('home.hero_how') }}
          </a>
          <p v-if="how" class="mt-4 text-sm leading-relaxed text-muted" data-testid="how-it-works-text">
            {{ $t('home.hero_how_text') }}
          </p>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-[1240px] px-3">
      <div v-if="!store.bannerClosed" class="mt-5 flex items-center justify-between rounded border border-line px-4 py-4 text-sm text-[#4d4d4d]" data-testid="info-banner">
        {{ $t('home.banner_text') }}
        <button @click="store.bannerClosed = true" class="text-ink hover:text-brand" data-testid="info-banner-close"><AppIcon name="close" :size="18" /></button>
      </div>

      <div v-if="filtered" class="mt-8 flex items-baseline justify-between">
        <h2 class="text-2xl font-semibold" data-testid="results-title">{{ title }}</h2>
        <router-link to="/" class="text-sm text-brand hover:underline" data-testid="clear-filter">{{ $t('home.clear_filters') }}</router-link>
      </div>

      <div class="mt-6 flex flex-wrap items-end gap-3" data-testid="home-filters">
        <label class="flex items-center gap-2 text-sm text-[#4d4d4d]">
          <span>{{ $t('filters.condition') }}</span>
          <select v-model="cond" data-testid="home-condition-filter"
            class="rounded border border-line bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-brand">
            <option value="">{{ $t('filters.all') }}</option>
            <option v-for="c in conditions" :key="c" :value="c">{{ $t(`condition.${c}`) }}</option>
          </select>
        </label>
        <label class="flex items-center gap-2 text-sm text-[#4d4d4d]">
          <span>{{ $t('filters.language') }}</span>
          <select v-model="lang" data-testid="home-language-filter"
            class="rounded border border-line bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-brand">
            <option value="">{{ $t('filters.all') }}</option>
            <option v-for="l in languages" :key="l" :value="l">{{ l }}</option>
          </select>
        </label>
        <label class="ml-auto flex items-center gap-2 text-sm text-[#4d4d4d]">
          <span>{{ $t('filters.sort') }}</span>
          <select v-model="sort" data-testid="home-sort-select"
            class="rounded border border-line bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-brand">
            <option value="">{{ $t('filters.sort_featured') }}</option>
            <option value="popular">{{ $t('filters.sort_popular') }}</option>
            <option value="newest">{{ $t('filters.sort_newest') }}</option>
            <option value="title">{{ $t('filters.sort_title') }}</option>
          </select>
        </label>
      </div>

      <p class="mt-3 text-sm text-muted" data-testid="results-count">{{ books.length }} {{ $t('filters.results_count') }}</p>

      <div class="mt-4 mb-10">
        <div v-if="!store.ready" class="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5" data-testid="home-skeleton">
          <div v-for="i in 10" :key="i" class="animate-pulse">
            <div class="aspect-[2/3] w-full rounded-[3px] bg-[#e8e8e8]"></div>
            <div class="mt-2 h-3 w-3/4 rounded bg-[#e8e8e8]"></div>
            <div class="mt-1 h-3 w-1/2 rounded bg-[#e8e8e8]"></div>
          </div>
        </div>
        <BookGrid v-else-if="books.length" :books="books" />
        <p v-else class="py-20 text-center text-muted" data-testid="no-results">{{ $t('home.no_results') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/AppIcon.vue'
import BookGrid from '@/components/BookGrid.vue'
import { store, categories, conditions } from '@/stores/books'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const how = ref(false)
const filtered = computed(() => route.query.q || route.query.cat)
const title = computed(() => (route.query.cat ? t(`category.${route.query.cat}`) : t('home.results_for', { q: route.query.q })))
const languages = computed(() => [...new Set(store.books.map((b) => b.language))])

const setQuery = (patch) => {
  const query = { ...route.query, ...patch }
  Object.keys(query).forEach((k) => !query[k] && delete query[k])
  router.replace({ query })
}
const bind = (key) => computed({
  get: () => route.query[key] || '',
  set: (v) => setQuery({ [key]: v || undefined }),
})
const cond = bind('cond')
const lang = bind('lang')
const sort = bind('sort')

const books = computed(() => {
  const q = (route.query.q || '').toLowerCase()
  const cat = route.query.cat || ''
  const condQ = route.query.cond || ''
  const langQ = route.query.lang || ''
  let list = store.books.filter((b) =>
    b.owner !== store.me &&
    (!cat || b.category === cat) &&
    (!condQ || b.condition === condQ) &&
    (!langQ || b.language === langQ) &&
    (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)))
  if (sort.value === 'popular') list = [...list].sort((a, b) => b.likes - a.likes)
  else if (sort.value === 'newest') list = [...list].sort((a, b) => b.id - a.id)
  else if (sort.value === 'title') list = [...list].sort((a, b) => a.title.localeCompare(b.title, 'ro'))
  return list
})
</script>
