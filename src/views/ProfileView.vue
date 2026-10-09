<template>
  <div class="mx-auto flex w-full max-w-[800px] flex-col gap-5 pb-10">
    <!-- Banner card (clickable) -->
    <div
      class="flex cursor-pointer items-center justify-between rounded-xl border border-line bg-white px-6 py-4 transition-all hover:border-brand hover:shadow-[0_4px_12px_rgba(4,60,37,0.05)]"
      @click="togglePublicView"
    >
      <div class="flex items-center gap-4">
        <div
          class="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full text-[1.2rem] font-bold text-white"
          style="background-color:#043c25"
        >B</div>
        <div>
          <h2 class="m-0 mb-0.5 text-[1.1rem] text-ink">Bianca Turcu</h2>
          <p class="m-0 text-[0.85rem] text-muted">
            București, România • ⭐ 4.9 (12 recenzii)
          </p>
        </div>
      </div>
      <div class="rounded-full bg-brand-soft px-3 py-1.5 text-[0.85rem] font-semibold text-brand">
        <span>{{ isPublicView ? 'Modifică profilul ⚙️' : 'Vezi cum te văd alții 👁️' }}</span>
      </div>
    </div>

    <!-- Public profile view -->
    <div class="flex flex-col gap-4" v-if="isPublicView">
      <div class="flex gap-2">
        <button
          :class="[
            'cursor-pointer rounded-full border px-4 py-2 text-[0.85rem] font-semibold transition-colors',
            activeTab === 'ads'
              ? 'border-brand bg-brand text-white'
              : 'border-line bg-white text-slate-600'
          ]"
          @click="activeTab = 'ads'"
        >Anunțuri (4)</button>
        <button
          :class="[
            'cursor-pointer rounded-full border px-4 py-2 text-[0.85rem] font-semibold transition-colors',
            activeTab === 'reviews'
              ? 'border-brand bg-brand text-white'
              : 'border-line bg-white text-slate-600'
          ]"
          @click="activeTab = 'reviews'"
        >Recenzii (12)</button>
        <button
          :class="[
            'cursor-pointer rounded-full border px-4 py-2 text-[0.85rem] font-semibold transition-colors',
            activeTab === 'about'
              ? 'border-brand bg-brand text-white'
              : 'border-line bg-white text-slate-600'
          ]"
          @click="activeTab = 'about'"
        >Despre</button>
      </div>

      <div class="rounded-xl border border-line bg-white p-5">
        <div
          v-if="activeTab === 'ads'"
          class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3"
        >
          <div
            v-for="book in userAds"
            :key="book.id"
            class="overflow-hidden rounded-lg border border-line"
          >
            <div
              class="flex h-[90px] items-center justify-center p-1 text-center text-[0.9rem] font-bold text-white"
              :style="{ background: book.bg }"
            >
              <span>{{ book.title }}</span>
            </div>
            <div class="p-2.5">
              <h4 class="m-0 mb-0.5 text-[0.9rem] text-ink">{{ book.title }}</h4>
              <p class="m-0 text-[0.75rem] text-muted">{{ book.condition }}</p>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'reviews'" class="flex flex-col gap-3">
          <div
            v-for="rev in reviews"
            :key="rev.id"
            class="border-b border-slate-chip pb-2.5"
          >
            <strong class="text-[0.9rem] text-ink">{{ rev.author }} ⭐⭐⭐⭐⭐</strong>
            <p class="mt-1 text-[0.85rem] text-slate-600">{{ rev.text }}</p>
          </div>
        </div>

        <div v-if="activeTab === 'about'" class="flex flex-col gap-3">
          <p><strong>Membru din:</strong> Martie 2026</p>
          <p>Pasionată de schimburi rapide de cărți pe ReviveBooks.</p>
        </div>
      </div>
    </div>

    <!-- Account sublinks -->
    <div v-else>
      <h3 class="mb-2.5 mt-2.5 text-base text-slate-700">Gestionare Cont & Cărți</h3>

      <div class="flex flex-col gap-2.5">
        <router-link
          to="/my-books"
          class="group flex items-center gap-4 rounded-xl border border-line bg-white px-5 py-4 no-underline transition-all hover:-translate-y-0.5 hover:border-line-2 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
        >
          <div class="flex-grow">
            <h4 class="m-0 mb-0.5 text-[0.95rem] text-ink">Cărțile mele</h4>
            <p class="m-0 text-[0.8rem] text-muted">Vezi și gestionează cărțile puse la schimb</p>
          </div>
          <span class="text-[1.2rem] font-bold text-muted-2">›</span>
        </router-link>

        <router-link
          to="/deliveries"
          class="group flex items-center gap-4 rounded-xl border border-line bg-white px-5 py-4 no-underline transition-all hover:-translate-y-0.5 hover:border-line-2 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
        >
          <div class="flex-grow">
            <h4 class="m-0 mb-0.5 text-[0.95rem] text-ink">Livrări & Colete</h4>
            <p class="m-0 text-[0.8rem] text-muted">Istoric AWB-uri și status curier</p>
          </div>
          <span class="text-[1.2rem] font-bold text-muted-2">›</span>
        </router-link>

        <router-link
          to="/alerts"
          class="group flex items-center gap-4 rounded-xl border border-line bg-white px-5 py-4 no-underline transition-all hover:-translate-y-0.5 hover:border-line-2 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
        >
          <div class="flex-grow">
            <h4 class="m-0 mb-0.5 text-[0.95rem] text-ink">Notificări</h4>
            <p class="m-0 text-[0.8rem] text-muted">Alerte de schimb și mesaje noi</p>
          </div>
          <span class="text-[1.2rem] font-bold text-muted-2">›</span>
        </router-link>

        <router-link
          to="/settings"
          class="group flex items-center gap-4 rounded-xl border border-line bg-white px-5 py-4 no-underline transition-all hover:-translate-y-0.5 hover:border-line-2 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
        >
          <div class="flex-grow">
            <h4 class="m-0 mb-0.5 text-[0.95rem] text-ink">Setări</h4>
            <p class="m-0 text-[0.8rem] text-muted">Date personale, parolă și preferințe</p>
          </div>
          <span class="text-[1.2rem] font-bold text-muted-2">›</span>
        </router-link>

        <router-link
          to="/premium"
          class="flex items-center gap-4 rounded-xl border border-brand bg-gradient-to-br from-[rgba(4,60,37,0.02)] to-[rgba(4,60,37,0.06)] px-5 py-4 no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
        >
          <div class="flex-grow">
            <h4 class="m-0 mb-0.5 text-[0.95rem] text-ink">ReviveBooks Premium</h4>
            <p class="m-0 text-[0.8rem] text-muted">Deblochează avantaje și promovare PRO</p>
          </div>
          <span class="text-[1.2rem] font-bold text-muted-2">›</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      isPublicView: false,
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
