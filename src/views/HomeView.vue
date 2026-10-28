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

      <div class="mt-8 mb-10">
        <BookGrid v-if="books.length" :books="books" />
        <p v-else class="py-20 text-center text-muted" data-testid="no-results">{{ $t('home.no_results') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/AppIcon.vue'
import BookGrid from '@/components/BookGrid.vue'
import { store } from '@/stores/books'

const route = useRoute()
const { t } = useI18n()
const how = ref(false)
const filtered = computed(() => route.query.q || route.query.cat)
const title = computed(() => (route.query.cat ? t(`category.${route.query.cat}`) : t('home.results_for', { q: route.query.q })))
const books = computed(() => {
  const q = (route.query.q || '').toLowerCase()
  return store.books.filter((b) =>
    b.owner !== store.me &&
    (!route.query.cat || b.category === route.query.cat) &&
    (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)))
})
</script>
