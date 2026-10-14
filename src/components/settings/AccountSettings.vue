<template>
  <div data-testid="settings-account">
    <div class="rounded border border-line">
      <div v-for="(f, i) in contacts" :key="f.key" :class="['flex items-center justify-between gap-4 px-6 py-5', i === 0 ? 'border-b border-line' : '']">
        <div>
          <input v-if="editing === f.key" v-model="s[f.key]" @blur="editing = ''" autofocus class="border-b border-brand outline-none" :data-testid="`account-${f.key}-input`" />
          <p v-else class="font-medium">{{ s[f.key] }}</p>
          <p class="flex items-center gap-1 text-xs text-muted">Verificat <AppIcon name="check" :size="12" class="text-brand" /></p>
        </div>
        <button @click="editing = f.key" class="rounded border border-brand px-3 py-1.5 text-xs font-medium text-brand hover:bg-brand-soft" :data-testid="`account-${f.key}-edit`">Modificare</button>
      </div>
    </div>
    <p class="mt-2 px-2 text-xs text-[#4d4d4d]">Numărul de telefon va fi utilizat numai pentru a te ajuta să te conectezi. Nu va fi făcut public.</p>

    <div class="mt-8 rounded border border-line">
      <label class="grid items-center gap-3 border-b border-line px-6 py-5 md:grid-cols-2">
        <span class="text-sm text-[#4d4d4d]">Nume complet</span>
        <input v-model="s.fullName" class="rounded border border-[#c9cccb] px-4 py-2.5 outline-none focus:border-brand" data-testid="account-fullname-input" />
      </label>
      <label class="grid items-center gap-3 border-b border-line px-6 py-5 md:grid-cols-2">
        <span class="text-sm text-[#4d4d4d]">Gen</span>
        <select v-model="s.gender" class="rounded border border-[#c9cccb] bg-white px-4 py-2.5 outline-none focus:border-brand" data-testid="account-gender-select">
          <option value="">Selectare gen</option><option>Feminin</option><option>Masculin</option><option>Altul</option>
        </select>
      </label>
      <label class="grid items-center gap-3 px-6 py-5 md:grid-cols-2">
        <span class="text-sm text-[#4d4d4d]">Data nașterii</span>
        <input type="date" v-model="s.birth" class="rounded border border-[#c9cccb] px-4 py-2.5 outline-none focus:border-brand" data-testid="account-birth-input" />
      </label>
    </div>

    <div class="mt-8 flex items-center justify-between rounded border border-line px-6 py-5">
      <div>
        <p class="font-medium">Mod Vacanță</p>
        <p class="text-sm text-muted">Cărțile tale vor fi ascunse temporar de la schimb.</p>
      </div>
      <ToggleSwitch v-model="s.vacation" data-testid="vacation-toggle" />
    </div>

    <div class="mt-8 rounded border border-line">
      <div v-for="(n, i) in ['facebook', 'google']" :key="n" :class="['flex items-center justify-between px-6 py-5', i === 0 ? 'border-b border-line' : '']">
        <span class="font-medium capitalize">{{ n }}</span>
        <button @click="s[n] = !s[n]" :data-testid="`connect-${n}-btn`"
          :class="['rounded border px-3 py-1.5 text-xs font-medium', s[n] ? 'border-[#4d4d4d] text-[#4d4d4d]' : 'border-brand text-brand hover:bg-brand-soft']">
          {{ s[n] ? 'Conectat' : 'Conectare' }}
        </button>
      </div>
    </div>
    <p class="mt-2 px-2 text-xs text-[#4d4d4d]">Conectează-te la celelalte conturi pentru a deveni un membru verificat și de încredere.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import ToggleSwitch from './ToggleSwitch.vue'
import { store } from '@/stores/books'
const s = store.settings
const editing = ref('')
const contacts = [{ key: 'email' }, { key: 'phone' }]
</script>
