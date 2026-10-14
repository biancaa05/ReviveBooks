<template>
  <div data-testid="settings-notifications">
    <template v-for="g in groups" :key="g.title">
      <p class="mb-2 px-4 text-sm text-[#4d4d4d]">{{ g.title }}</p>
      <div class="mb-8 rounded border border-line">
        <div v-for="r in g.rows" :key="r.key" class="flex items-center justify-between gap-4 border-b border-line px-4 py-4 last:border-0">
          <div>
            <p class="font-medium">{{ r.title }}</p>
            <p v-if="r.text" class="text-[#4d4d4d]">{{ r.text }}</p>
          </div>
          <ToggleSwitch v-model="n[r.key]" :data-testid="`notif-${r.key}-toggle`" />
        </div>
        <label v-if="g.limit" class="block px-4 py-4">
          <span class="text-sm text-[#4d4d4d]">Setează o limită zilnică pentru fiecare tip de notificare</span>
          <select v-model="n.limit" class="mt-1 w-full border-b border-line bg-white py-1 outline-none" data-testid="notif-limit-select">
            <option v-for="o in limits" :key="o">{{ o }}</option>
          </select>
        </label>
      </div>
    </template>
    <div class="flex items-center justify-between rounded border border-line px-4 py-4">
      <p class="font-medium">Activare notificări prin e-mail</p>
      <ToggleSwitch v-model="n.email" data-testid="notif-email-toggle" />
    </div>
  </div>
</template>

<script setup>
import ToggleSwitch from './ToggleSwitch.vue'
import { store } from '@/stores/books'
const n = store.settings.notif
const limits = ['Până la 2 notificări', 'Până la 5 notificări', 'Nelimitat']
const groups = [
  { title: 'Noutăți', rows: [
    { key: 'news', title: 'Noutăți de la ReviveBooks', text: 'Fii prima persoană care află despre cele mai noi funcții și actualizări.' },
    { key: 'marketing', title: 'Recomandări de lectură', text: 'Primești recomandări personalizate de cărți.' },
  ] },
  { title: 'Notificări cu prioritate ridicată', rows: [
    { key: 'messages', title: 'Mesaje noi' },
    { key: 'feedback', title: 'Feedback nou' },
  ] },
  { title: 'Alte notificări', limit: true, rows: [{ key: 'favorites', title: 'Cărți adăugate în Favorite' }] },
]
</script>
