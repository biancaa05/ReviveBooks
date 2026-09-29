<template>
  <div class="my-books-page">
    <div class="page-header">
      <h1>Cărțile mele puse la schimb</h1>
      <router-link to="/add" class="vinted-btn-primary">+ Adaugă o carte</router-link>
    </div>

    <div class="books-grid">
      <div class="book-manage-card" v-for="book in myBooks" :key="book.id">
        <div class="book-cover-mini" :style="{ background: book.bg }">
          <span>{{ book.title }}</span>
        </div>
        <div class="book-info">
          <h3>{{ book.title }}</h3>
          <p>{{ book.author }}</p>
          <span class="status-badge">{{ book.status }}</span>
        </div>
        <div class="book-actions">
          <button class="vinted-btn-outline" @click="editBook(book.id)">Editează</button>
          <button class="delete-btn" @click="deleteBook(book.id)">Șterge</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/mybooks.js"></script>
<style src="@/assets/css/mybooks.css"></style>