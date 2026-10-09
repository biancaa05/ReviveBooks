<template>
  <div class="mx-auto w-full max-w-7xl py-2">
    <header class="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 class="text-3xl font-bold tracking-tight text-slate-900">ReviveBooks</h1>
      <button class="inline-flex items-center justify-center rounded-full bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800" @click="isModalOpen = true">＋ Adaugă</button>
    </header>

    <div class="mb-5 space-y-4">
      <div class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-5 w-5 text-slate-400">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Caută articole, autori..."
          class="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="[
            'cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition',
            selectedCategory === cat
              ? 'border-emerald-900 bg-emerald-900 text-white shadow-sm'
              : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-700 hover:text-emerald-800'
          ]"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <main class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="book in filteredBooks"
        :key="book.id"
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div class="flex h-52 items-end justify-between p-4 text-white" :style="{ backgroundColor: book.bgColor }">
          <span v-if="book.isPremium" class="rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-900">Top</span>
          <span class="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm">{{ book.condition }}</span>
          <span class="max-w-[70%] truncate text-sm font-semibold">{{ book.title }}</span>
        </div>

        <div class="p-4">
          <div class="mb-3 flex items-center justify-between gap-3">
            <span class="text-base font-semibold text-slate-900">Schimb</span>
            <button class="text-xl leading-none text-slate-500 transition hover:text-emerald-700">♡</button>
          </div>
          <p class="mb-1 text-lg font-bold text-slate-900">{{ book.title }}</p>
          <p class="mb-1 text-sm text-slate-500">{{ book.author }}</p>
          <p class="mb-4 text-xs text-slate-400">de la {{ book.owner }}</p>

          <button class="inline-flex w-full items-center justify-center rounded-xl border border-emerald-900 bg-white px-4 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50" @click="requestSwap(book)">
            Vreau cartea
          </button>
        </div>
      </article>
    </main>

    <AddBookModal
      v-if="isModalOpen"
      @close="isModalOpen = false"
      @add-book="addNewBook"
    />
  </div>
</template>

<script src="@/assets/js/listings.js"></script>