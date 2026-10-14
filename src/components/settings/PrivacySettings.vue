<template>
  <div data-testid="settings-privacy">
    <div class="rounded border border-line">
      <div v-for="r in rows" :key="r.key" class="flex items-center justify-between gap-4 border-b border-line px-4 py-4 last:border-0">
        <div>
          <p class="font-medium">{{ r.title }}</p>
          <p class="text-[#4d4d4d]">{{ r.text }}</p>
        </div>
        <ToggleSwitch v-model="p[r.key]" :data-testid="`privacy-${r.key}-toggle`" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ToggleSwitch from './ToggleSwitch.vue'
import { store } from '@/stores/books'
const p = store.settings.privacy
const rows = [
  { key: 'showOnline', title: 'Afișează când sunt online', text: 'Ceilalți membri vor vedea când ai fost activ ultima dată.' },
  { key: 'personalized', title: 'Recomandări personalizate', text: 'Folosim cărțile favorite pentru a-ți sugera cărți noi.' },
  { key: 'thirdParty', title: 'Partajare cu parteneri', text: 'Permite partajarea datelor anonime cu partenerii noștri.' },
]
</script>
