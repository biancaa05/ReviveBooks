<template>
  <div class="vinted-page">
    <!-- Editorial hero -->
    <section class="home-hero">
      <span class="eyebrow">bine ai revenit —</span>
      <h1>Cărți cu <em>povești deja trăite.</em></h1>
      <p class="home-lede">
        Un târg cald de schimburi între cititori. Găsește-ți următoarea carte
        preferată, apoi trimite-o mai departe.
      </p>
    </section>

    <header class="vinted-top-bar">
      <div class="search-filter-section-inline">
        <div class="vinted-search-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Caută după titlu, autor sau gen..."
            data-testid="search-input"
          />
        </div>
      </div>
      <button class="vinted-btn-primary" @click="isModalOpen = true" data-testid="sell-book-btn">
        + Vinde o carte
      </button>
    </header>

    <div class="categories-container">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="['vinted-chip', { active: selectedCategory === cat }]"
        @click="selectedCategory = cat"
        :data-testid="`chip-${cat}`"
      >
        {{ cat }}
      </button>
    </div>

    <div class="grid-section-title">
      <h2>Descoperă comoara</h2>
      <span class="count-note" v-if="filteredBooks.length">
        {{ filteredBooks.length }} cărți pentru schimb
      </span>
    </div>

    <main class="vinted-grid">
      <div
        class="vinted-card"
        v-for="book in filteredBooks"
        :key="book.id"
        :data-testid="`book-card-${book.id}`"
      >
        <div class="card-cover" :style="{ backgroundColor: book.bgColor }">
          <span class="vinted-badge" v-if="book.isPremium">Top</span>
          <span class="condition-badge">{{ book.condition }}</span>
          <span class="book-title-overlay">{{ book.title }}</span>
        </div>

        <div class="card-details">
          <div class="price-row">
            <span class="book-price">Schimb</span>
            <button class="fav-btn" :data-testid="`fav-${book.id}`">♡</button>
          </div>
          <p class="book-title-text">{{ book.title }}</p>
          <p class="book-author-text">de {{ book.author }}</p>
          <p class="uploader-text">postat de {{ book.owner }}</p>

          <button class="vinted-btn-outline" @click="requestSwap(book)" :data-testid="`swap-${book.id}`">
            Vreau cartea
          </button>
        </div>
      </div>

      <div v-if="filteredBooks.length === 0" class="empty-state">
        Nu am găsit nimic pe rafturile astea — încearcă altă categorie.
      </div>
    </main>
  </div>
</template>

<script src="@/assets/js/home.js"></script>
<style scoped src="@/assets/css/home.css"></style>
