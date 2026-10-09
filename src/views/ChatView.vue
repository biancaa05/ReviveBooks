<template>
  <div class="mx-auto w-full max-w-4xl py-2">
    <div class="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div class="flex items-center gap-3">
          <button class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-600 transition hover:bg-slate-50" @click="goBack">←</button>
          <div class="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white" :style="{ backgroundColor: partner.avatarColor }">
            {{ partner.initials }}
          </div>
          <div>
            <h2 class="text-lg font-semibold text-slate-900">{{ partner.name }}</h2>
            <span class="text-xs text-slate-500">{{ partner.status }}</span>
          </div>
        </div>

        <div class="flex flex-col gap-2 md:items-end">
          <div class="text-sm text-slate-600">Carte: <strong>{{ book.title }}</strong></div>
          <button
            class="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
            :class="myDeliveryReady ? 'border-emerald-700 bg-emerald-100 text-emerald-800' : 'border-slate-200 bg-slate-50 text-slate-600'"
            @click="toggleDeliveryReady"
          >
            Gata de livrare ({{ deliveryCount }}/2)
          </button>
        </div>
      </div>
    </div>

    <div class="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div v-for="msg in messages" :key="msg.id" class="flex" :class="msg.sender === 'me' ? 'justify-end' : 'justify-start'">
        <div class="max-w-[80%] rounded-2xl px-3 py-2 text-sm" :class="msg.sender === 'me' ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-700'">
          <p class="leading-relaxed">{{ msg.text }}</p>
          <span class="mt-1 block text-[10px] opacity-70">{{ msg.time }}</span>
        </div>
      </div>
    </div>

    <div class="mt-4 flex gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <input
        type="text"
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Scrie un mesaj..."
        class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-700 focus:bg-white"
      />
      <button class="inline-flex items-center justify-center rounded-xl bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800" @click="sendMessage">Trimite</button>
    </div>

    <div v-if="showDeliveryScreen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div class="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <h2 class="text-2xl font-bold text-slate-900">Detalii Livrare &amp; Colet</h2>
        <p class="mt-3 text-sm text-slate-600">Ambele părți au confirmat schimbul pentru <strong>„{{ book.title }}”</strong>. Completează adresa completă de expediere:</p>

        <div class="mt-5 grid gap-4 md:grid-cols-2">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">Județ:</label>
            <input type="text" v-model="deliveryForm.county" placeholder="Ex: București / Cluj" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-700 focus:bg-white" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">Oraș / Localitate:</label>
            <input type="text" v-model="deliveryForm.city" placeholder="Ex: Sector 1 / Cluj-Napoca" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-700 focus:bg-white" />
          </div>
          <div class="md:col-span-2 flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">Stradă și Număr:</label>
            <input type="text" v-model="deliveryForm.street" placeholder="Ex: Str. Libertății, Nr. 10" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-700 focus:bg-white" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">Cod Poștal:</label>
            <input type="text" v-model="deliveryForm.zipCode" placeholder="Ex: 010101" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-700 focus:bg-white" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">Detalii Extra:</label>
            <input type="text" v-model="deliveryForm.extra" placeholder="Ex: Bl. A2, Sc. 1, Ap. 14" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-700 focus:bg-white" />
          </div>
        </div>

        <div class="mt-5 flex flex-col gap-2">
          <label class="text-sm font-semibold text-slate-700">Alege curierul:</label>
          <div class="grid gap-3 md:grid-cols-3">
            <label class="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 transition" :class="deliveryForm.courier === 'fancourier' ? 'border-emerald-700 bg-emerald-50 text-emerald-900' : ''">
              <input type="radio" value="fancourier" v-model="deliveryForm.courier" />
              <span>Fan Courier</span>
            </label>
            <label class="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 transition" :class="deliveryForm.courier === 'sameday' ? 'border-emerald-700 bg-emerald-50 text-emerald-900' : ''">
              <input type="radio" value="sameday" v-model="deliveryForm.courier" />
              <span>Sameday Easybox</span>
            </label>
            <label class="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 transition" :class="deliveryForm.courier === 'cargus' ? 'border-emerald-700 bg-emerald-50 text-emerald-900' : ''">
              <input type="radio" value="cargus" v-model="deliveryForm.courier" />
              <span>Cargus</span>
            </label>
          </div>
        </div>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
          <button class="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" @click="showDeliveryScreen = false">Înapoi la chat</button>
          <button class="flex-1 rounded-xl bg-emerald-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800" @click="confirmShipping">Generează AWB</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/chat.js"></script>