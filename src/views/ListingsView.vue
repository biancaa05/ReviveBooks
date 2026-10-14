<template>
  <div class="vinted-page">
    <header class="vinted-top-bar">
      <h1>ReviveBooks</h1>
      <button class="vinted-btn-primary" @click="isModalOpen = true">＋ Adaugă</button>
    </header>

    <div class="search-filter-section">
      <div class="vinted-search-bar">
        <span>🔍</span>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Caută articole, autori..." 
        />
      </div>

      <div class="categories-scroll">
        <button 
          v-for="cat in categories" 
          :key="cat"
          :class="['vinted-chip', { active: selectedCategory === cat }]"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
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
          <p class="uploader-text">de la {{ book.owner }}</p>
          
          <button class="vinted-btn-outline" @click="requestSwap(book)">
            Vreau cartea
          </button>
        </div>
      </div>
    </main>

    <AddBookModal 
      v-if="isModalOpen" 
      @close="isModalOpen = false" 
      @add-book="addNewBook" 
    />
  </div>
</template>

<script src="@/assets/js/listings.js"></script>
<style scoped src="@/assets/css/listings.css"></style>