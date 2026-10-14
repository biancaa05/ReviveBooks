<template>
  <div data-testid="settings-security">
    <h2 class="text-2xl font-medium">Păstrează-ți contul în siguranță</h2>
    <p class="mt-1 mb-5 text-[#4d4d4d]">Verifică-ți informațiile pentru a-ți proteja contul.</p>
    <div class="rounded border border-line">
      <button v-for="r in rows" :key="r.title" @click="open = open === r.title ? '' : r.title" :data-testid="`security-${r.id}`"
        class="block w-full border-b border-line px-4 py-4 text-left last:border-0 hover:bg-[#fafafa]">
        <span class="flex items-center justify-between">
          <span>
            <span class="block font-medium">{{ r.title }}</span>
            <span class="block text-[#4d4d4d]">{{ r.text }}</span>
          </span>
          <AppIcon name="caret" :size="20" fill :class="['transition-transform', open === r.title ? '' : '-rotate-90']" />
        </span>
        <span v-if="open === r.title" class="mt-3 block text-sm text-brand">{{ r.detail }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
const open = ref('')
const rows = [
  { id: 'email', title: 'E-mail', text: 'Actualizează-ți adresa de e-mail.', detail: 'Poți modifica e-mailul din Setări cont.' },
  { id: 'password', title: 'Parolă', text: 'Protejează-ți contul cu o parolă mai puternică.', detail: 'Ți-am trimis un link de resetare pe e-mail.' },
  { id: '2fa', title: 'Autentificare cu doi factori', text: 'Securizează-ți conectarea cu un pas simplu de verificare.', detail: 'Autentificarea cu doi factori este activă prin SMS.' },
  { id: 'devices', title: 'Activitate de conectare', text: 'Gestionează dispozitivele pe care te conectezi.', detail: 'Conectat acum: Firefox · Linux · Brăila' },
]
</script>
