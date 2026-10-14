<template>
  <div class="max-w-[920px] mx-auto px-4 py-6 flex flex-col gap-6">
    <button class="flex items-center gap-2 text-ink-mute hover:text-ink transition-colors w-fit" @click="$router.go(-1)">
      <ArrowLeft :size="18" /> Înapoi
    </button>

    <div class="grid md:grid-cols-[300px_1fr] gap-8 bg-paper p-6 md:p-8 rounded-[20px] border border-line shadow-sm">
      <div class="h-[360px] rounded-lg overflow-hidden relative flex items-end p-5 text-paper" :style="{ backgroundColor: book.bgColor }">
        <span class="absolute top-4 right-4 bg-[rgba(15,61,44,0.88)] text-paper text-xs font-medium py-1 px-3 rounded-full backdrop-blur-sm">{{ book.condition }}</span>
        <h1 class="font-display italic text-2xl font-bold relative z-10 text-shadow">{{ book.title }}</h1>
      </div>

      <div class="flex flex-col justify-between">
        <div class="flex flex-col gap-2">
          <span class="font-display italic text-forest font-bold tracking-wide">Schimb de carte</span>
          <h2 class="font-display text-3xl font-semibold text-ink">{{ book.title }}</h2>
          <p class="text-ink-soft italic text-lg">de {{ book.author }}</p>
          <span class="inline-block mt-2 px-3 py-1 bg-brand-soft text-brand text-xs font-semibold rounded-full w-fit">{{ book.category }}</span>
          
          <div class="mt-4 pt-4 border-t border-line">
            <h3 class="text-sm font-semibold text-ink mb-1">Descriere / Detalii stare:</h3>
            <p class="text-ink-mute text-sm leading-relaxed">{{ book.description || 'Cartea este bine întreținută, fără pagini lipsă sau sublinieri.' }}</p>
          </div>
        </div>

        <!-- Uploader card / Link spre profilul altui utilizator -->
        <div class="mt-6 pt-5 border-t border-line flex items-center justify-between">
          <div class="flex items-center gap-3 cursor-pointer group" @click="viewProfile(book.owner)">
            <div class="w-12 h-12 rounded-full bg-forest text-paper flex items-center justify-center font-bold text-lg">
              {{ book.owner[0] }}
            </div>
            <div>
              <p class="text-xs text-ink-mute">Postat de</p>
              <h4 class="font-semibold text-ink group-hover:text-forest transition-colors">{{ book.owner }}</h4>
            </div>
          </div>

          <button class="vinted-btn-primary py-2.5 px-5" @click="requestSwap(book)">
            Vreau cartea
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/bookdetail.js"></script>