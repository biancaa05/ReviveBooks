<template>
<<<<<<< HEAD
  <div data-testid="home-page">
    <section v-if="!store.loggedIn && !filtered" class="relative h-[460px] bg-cover bg-center md:h-[624px]" data-testid="hero-section"
      style="background-image: url('https://images.unsplash.com/photo-1655584207245-44c66fc27e54?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000')">
      <div class="mx-auto flex h-full max-w-[1240px] items-center px-3">
        <div class="w-full max-w-[384px] rounded-lg bg-white p-8 shadow-sm">
          <h1 class="text-2xl leading-snug font-medium">Ești gata să-ți eliberezi raftul de cărți?</h1>
          <router-link to="/add" class="mt-8 block rounded bg-brand py-3 text-center text-white transition-colors hover:bg-brand-dark" data-testid="hero-add-book-btn">
            Adaugă o carte
          </router-link>
          <a href="#cum-functioneaza" @click.prevent="how = !how" class="mt-6 block text-center font-medium text-brand hover:underline" data-testid="hero-how-it-works">
            Află cum funcționează
          </a>
          <p v-if="how" class="mt-4 text-sm leading-relaxed text-muted" data-testid="how-it-works-text">
            Adaugi cărțile pe care le-ai citit, alegi o carte care îți place și propui un schimb. Fără bani — doar cărți care își găsesc un nou cititor.
          </p>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-[1240px] px-3">
      <div v-if="!store.bannerClosed" class="mt-5 flex items-center justify-between rounded border border-line px-4 py-4 text-sm text-[#4d4d4d]" data-testid="info-banner">
        Schimburile sunt gratuite — costurile de expediere sunt aplicate la check-out
        <button @click="store.bannerClosed = true" class="text-ink hover:text-brand" data-testid="info-banner-close"><AppIcon name="close" :size="18" /></button>
      </div>

      <div v-if="filtered" class="mt-8 flex items-baseline justify-between">
        <h2 class="text-2xl font-semibold" data-testid="results-title">{{ title }}</h2>
        <router-link to="/" class="text-sm text-brand hover:underline" data-testid="clear-filter">Șterge filtrele</router-link>
      </div>

      <div class="mt-8 mb-10">
        <BookGrid v-if="books.length" :books="books" />
        <p v-else class="py-20 text-center text-muted" data-testid="no-results">Nu am găsit nicio carte. Încearcă altă căutare.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from '@/components/AppIcon.vue'
import BookGrid from '@/components/BookGrid.vue'
import { store } from '@/stores/books'

const route = useRoute()
const how = ref(false)
const filtered = computed(() => route.query.q || route.query.cat)
const title = computed(() => route.query.cat || `Rezultate pentru „${route.query.q}”`)
const books = computed(() => {
  const q = (route.query.q || '').toLowerCase()
  return store.books.filter((b) =>
    b.owner !== store.me &&
    (!route.query.cat || b.category === route.query.cat) &&
    (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)))
})
</script>
=======
  <div class="vinted-page">
    <header class="vinted-top-bar">
      <div class="search-filter-section-inline">
        <div class="vinted-search-bar">
          <span>🔍</span>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Caută după titlu, autor sau gen..." 
          />
        </div>
      </div>
      <button class="vinted-btn-primary" @click="isModalOpen = true">＋ Vinde o carte</button>
    </header>

    <div class="categories-container">
      <button 
        v-for="cat in categories" 
        :key="cat"
        :class="['vinted-chip', { active: selectedCategory === cat }]"
        @click="selectedCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <main class="vinted-grid">
      <div 
        class="vinted-card" 
        v-for="book in filteredBooks" 
        :key="book.id"
      >
        <div class="card-cover" :style="{ backgroundColor: book.bgColor }">
          <span class="vinted-badge" v-if="book.isPremium">Top</span>
          <span class="condition-badge">{{ book.condition }}</span>
          <span class="book-title-overlay">{{ book.title }}</span>
        </div>
        
        <div class="card-details">
          <div class="price-row">
            <span class="book-price">Schimb</span>
            <button class="fav-btn">♡</button>
          </div>
          <p class="book-title-text">{{ book.title }}</p>
          <p class="book-author-text">{{ book.author }}</p>
          <p class="uploader-text">Adăugat de: {{ book.owner }}</p>
          
          <button class="vinted-btn-outline" @click="requestSwap(book)">
            Vreau cartea
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script src="@/assets/js/home.js"></script>
<style scoped src="@/assets/css/home.css"></style>
>>>>>>> f152b90 (Added all pages and some functionalities)
