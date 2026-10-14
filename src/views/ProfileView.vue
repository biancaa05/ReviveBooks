<template>
<<<<<<< HEAD
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
=======
  <div class="profile-main-page">
    <!-- 1. Cardul scurt și lat de profil (Clickabil / Vizualizare Profil Vinted) -->
    <div class="profile-banner-card" @click="togglePublicView">
      <div class="banner-left">
        <div class="profile-avatar-med" style="background-color: #043c25;">B</div>
        <div class="banner-info">
          <h2>Bianca Turcu</h2>
          <p>📍 București, România • ⭐ 4.9 (12 recenzii)</p>
        </div>
      </div>
      <div class="banner-action-hint">
        <span>{{ isPublicView ? 'Modifică profilul ⚙️' : 'Vezi cum te văd alții 👁️' }}</span>
      </div>
    </div>

    <!-- 2. Vizualizare dinamică: Profilul propriu (cu Anunțuri și Recenzii) vs Setări/Subpagini -->
    <div class="profile-content-section" v-if="isPublicView">
      <div class="profile-subtabs">
        <button :class="{ active: activeTab === 'ads' }" @click="activeTab = 'ads'">Anunțuri (4)</button>
        <button :class="{ active: activeTab === 'reviews' }" @click="activeTab = 'reviews'">Recenzii (12)</button>
        <button :class="{ active: activeTab === 'about' }" @click="activeTab = 'about'">Despre</button>
      </div>

      <div class="tab-card-body">
        <div v-if="activeTab === 'ads'" class="grid-books-vinted">
          <div class="book-card-item" v-for="book in userAds" :key="book.id">
            <div class="cover-thumb" :style="{ background: book.bg }">
              <span>{{ book.title }}</span>
            </div>
            <div class="details-thumb">
              <h4>{{ book.title }}</h4>
              <p>{{ book.condition }}</p>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'reviews'" class="reviews-list">
          <div class="review-row" v-for="rev in reviews" :key="rev.id">
            <strong>{{ rev.author }} ⭐⭐⭐⭐⭐</strong>
            <p>{{ rev.text }}</p>
          </div>
        </div>

        <div v-if="activeTab === 'about'" class="about-row">
          <p><strong>Membru din:</strong> Martie 2026</p>
          <p>Pasionată de schimburi rapide de cărți pe ReviveBooks.</p>
>>>>>>> f152b90 (Added all pages and some functionalities)
        </div>
      </div>
    </div>

<<<<<<< HEAD
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
=======
    <!-- 3. Subpagini / Link-uri rapide plasate SUB cardul de profil -->
    <div class="profile-sublinks-grid" v-else>
      <h3 class="section-title">Gestionare Cont & Cărți</h3>
      
      <div class="sublink-cards">
        <router-link to="/my-books" class="sublink-card">
          <span class="icon">📖</span>
          <div>
            <h4>Cărțile mele</h4>
            <p>Vezi și gestionează cărțile puse la schimb</p>
          </div>
          <span class="arrow">›</span>
        </router-link>

        <router-link to="/deliveries" class="sublink-card">
          <span class="icon">🚀</span>
          <div>
            <h4>Livrări & Colete</h4>
            <p>Istoric AWB-uri și status curier</p>
          </div>
          <span class="arrow">›</span>
        </router-link>

        <router-link to="/alerts" class="sublink-card">
          <span class="icon">🔔</span>
          <div>
            <h4>Notificări</h4>
            <p>Alerte de schimb și mesaje noi</p>
          </div>
          <span class="arrow">›</span>
        </router-link>

        <router-link to="/settings" class="sublink-card">
          <span class="icon">⚙️</span>
          <div>
            <h4>Setări</h4>
            <p>Date personale, parolă și preferințe</p>
          </div>
          <span class="arrow">›</span>
        </router-link>

        <router-link to="/premium" class="sublink-card premium-card-link">
          <span class="icon">✨</span>
          <div>
            <h4>ReviveBooks Premium</h4>
            <p>Deblochează avantaje și promovare PRO</p>
          </div>
          <span class="arrow">›</span>
        </router-link>
>>>>>>> f152b90 (Added all pages and some functionalities)
      </div>
    </div>
  </div>
</template>

<<<<<<< HEAD
<script setup>
import { ref, computed } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import BookGrid from '@/components/BookGrid.vue'
import { store } from '@/stores/books'

const tabs = ['Cărți', 'Evaluări']
const tab = ref('Cărți')
const swaps = 8
const mine = computed(() => store.books.filter((b) => b.owner === store.me))
const reviews = [
  { user: 'kriszi_09', text: 'Schimb rapid, cartea exact ca în descriere. Mulțumesc!' },
  { user: 'deea_44', text: 'Foarte comunicativă, recomand.' },
]
</script>
=======
<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      isPublicView: false, // Comută între vizualizarea publică a profilului și meniul de subpagini
      activeTab: 'ads',
      userAds: [
        { id: 1, title: 'Normal People', condition: 'Ca nouă', bg: '#043c25' },
        { id: 2, title: 'Atomic Habits', condition: 'Excelentă', bg: '#1b4332' }
      ],
      reviews: [
        { id: 1, author: 'Ana P.', text: 'Schimb decalat perfect, cartea a ajuns impecabilă!' },
        { id: 2, author: 'Mihai D.', text: 'Recomand cu mare drag, comunicare excelentă.' }
      ]
    }
  },
  methods: {
    togglePublicView() {
      this.isPublicView = !this.isPublicView;
    }
  }
}
</script>

<style src="@/assets/css/profile.css"></style>
>>>>>>> f152b90 (Added all pages and some functionalities)
