<template>
  <div class="mx-auto w-full max-w-5xl py-2">
    <div class="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 class="text-3xl font-bold tracking-tight text-slate-900">Cărțile mele puse la schimb</h1>
      <router-link to="/add" class="inline-flex items-center justify-center rounded-full bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800">
        + Adaugă o carte
      </router-link>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div v-for="book in myBooks" :key="book.id" class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="flex h-32 items-end p-4 text-sm font-semibold text-white" :style="{ background: book.bg }">
          <span class="max-w-[80%] truncate">{{ book.title }}</span>
        </div>
        <div class="space-y-3 p-4">
          <div>
            <h3 class="text-lg font-semibold text-slate-900">{{ book.title }}</h3>
            <p class="text-sm text-slate-500">{{ book.author }}</p>
          </div>
          <span class="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">{{ book.status }}</span>
        </div>
        <div class="flex gap-3 border-t border-slate-100 p-4">
          <button class="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" @click="editBook(book.id)">Editează</button>
          <button class="flex-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100" @click="deleteBook(book.id)">Șterge</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/mybooks.js"></script>