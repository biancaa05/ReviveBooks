<template>
  <div data-testid="settings-shipping">
    <h2 class="mb-4 text-lg font-medium">Adresa ta</h2>
    <div class="rounded border border-line px-4 py-4">
      <div v-if="editing" class="grid gap-3" data-testid="address-form">
        <input v-for="k in ['name', 'street', 'zip', 'city']" :key="k" v-model="a[k]" class="border-b border-line py-1 outline-none focus:border-brand" :data-testid="`address-${k}-input`" />
        <button @click="editing = false" class="justify-self-end rounded bg-brand px-4 py-2 text-sm text-white hover:bg-brand-dark" data-testid="address-save-btn">Salvează</button>
      </div>
      <div v-else class="flex justify-between">
        <div>
          <p class="font-medium">{{ a.name }}</p>
          <p class="text-[#4d4d4d]">{{ a.street }}</p>
          <p class="text-[#4d4d4d]">{{ a.zip }}, {{ a.city }}</p>
        </div>
        <button @click="editing = true" class="self-start text-sm text-brand hover:underline" data-testid="address-edit-btn">Editează</button>
      </div>
    </div>
    <p class="mt-3 text-sm text-[#4d4d4d]">De aici curierii vor colecta cărțile pe care le trimiți și aici vor livra cărțile primite la schimb.</p>

    <div class="mt-8 flex gap-3 rounded bg-brand-soft p-5 text-sm">
      <AppIcon name="info" :size="20" class="shrink-0 text-brand" />
      <p>Dezactivarea opțiunilor de expediere poate reduce numărul de schimburi. Dacă un membru poate face schimb cu tine doar cu o opțiune dezactivată, i-o putem oferi în continuare.</p>
    </div>

    <h2 class="mt-10 text-lg font-medium">Expediere la schimb</h2>
    <p class="mb-4 text-[#4d4d4d]">Alege ce opțiuni dorești să utilizezi pentru trimiterea cărților.</p>
    <div class="flex flex-col gap-3">
      <div v-for="o in options" :key="o.key" class="flex items-center gap-3 rounded border border-line px-4 py-4">
        <AppIcon :name="o.icon" :size="22" class="text-[#4d4d4d]" />
        <div class="flex-1">
          <p class="font-medium">{{ o.title }}</p>
          <p class="text-[#4d4d4d]">{{ o.text }}</p>
        </div>
        <ToggleSwitch v-model="s[o.key]" :data-testid="`ship-${o.key}-toggle`" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import ToggleSwitch from './ToggleSwitch.vue'
import { store } from '@/stores/books'
const s = store.settings
const a = s.address
const editing = ref(false)
const options = [
  { key: 'shipHome', icon: 'home', title: 'De la adresa ta', text: 'Un curier colectează cartea de la tine.' },
  { key: 'shipPoint', icon: 'pin', title: 'De la un punct de depunere', text: 'Duci cartea la un locker sau la un punct de ridicare a coletelor.' },
]
</script>
