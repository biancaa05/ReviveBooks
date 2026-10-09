<template>
  <div class="mx-auto w-full max-w-7xl py-2">
    <section class="mb-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm md:p-8">
      <span class="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/80">
        bine ai revenit —
      </span>
      <h1 class="mb-3 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
        Cărți cu <em class="not-italic text-emerald-800">povești deja trăite.</em>
      </h1>
      <p class="max-w-2xl text-base text-slate-600 md:text-lg">
        Un târg cald de schimburi între cititori. Găsește-ți următoarea carte
        preferată, apoi trimite-o mai departe.
      </p>
    </section>

    <header class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="flex-1">
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-5 w-5 text-slate-400">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Caută după titlu, autor sau gen..."
            data-testid="search-input"
            class="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      <button
        class="inline-flex items-center justify-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
        @click="isModalOpen = true"
        data-testid="sell-book-btn"
      >
        + Vinde o carte
      </button>
    </header>

    <div class="mb-5 flex flex-wrap gap-2">
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
        :data-testid="`chip-${cat}`"
      >
        {{ cat }}
      </button>
    </div>

    <div class="mb-4 flex items-center justify-between gap-3">
      <h2 class="text-2xl font-bold tracking-tight text-slate-900">Descoperă comoara</h2>
      <span v-if="filteredBooks.length" class="text-sm text-slate-500">
        {{ filteredBooks.length }} cărți pentru schimb
      </span>
    </div>

    <main class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="book in filteredBooks"
        :key="book.id"
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        :data-testid="`book-card-${book.id}`"
      >
        <div class="flex h-52 items-end justify-between p-4 text-white" :style="{ backgroundColor: book.bgColor }">
          <span v-if="book.isPremium" class="rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-900">Top</span>
          <span class="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm">{{ book.condition }}</span>
          <span class="max-w-[70%] truncate text-sm font-semibold">{{ book.title }}</span>
        </div>

        <div class="p-4">
          <div class="mb-3 flex items-center justify-between gap-3">
            <span class="text-base font-semibold text-slate-900">Schimb</span>
            <button class="text-xl leading-none text-slate-500 transition hover:text-emerald-700" :data-testid="`fav-${book.id}`">♡</button>
          </div>
          <p class="mb-1 text-lg font-bold text-slate-900">{{ book.title }}</p>
          <p class="mb-1 text-sm text-slate-500">de {{ book.author }}</p>
          <p class="mb-4 text-xs text-slate-400">postat de {{ book.owner }}</p>

          <button
            class="inline-flex w-full items-center justify-center rounded-xl border border-emerald-900 bg-white px-4 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
            @click="requestSwap(book)"
            :data-testid="`swap-${book.id}`"
          >
            Vreau cartea
          </button>
        </div>
      </article>

      <div v-if="filteredBooks.length === 0" class="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500 md:col-span-2 xl:col-span-3">
        Nu am găsit nimic pe rafturile astea — încearcă altă categorie.
      </div>
    </main>
  </div>
</template>

<script src="@/assets/js/home.js"></script>
