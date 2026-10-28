<template>
  <div data-testid="settings-profile">
    <div class="rounded border border-line">
      <div class="flex items-center justify-between border-b border-line px-6 py-6">
        <span class="font-medium">Fotografia ta</span>
        <div class="flex items-center gap-4">
          <UserAvatar class="h-16 w-16 text-3xl" />
          <label class="cursor-pointer rounded border border-brand px-3 py-1.5 text-xs font-medium text-brand hover:bg-brand-soft" data-testid="choose-photo-btn">
            Alegere fotografie
            <input type="file" accept="image/*" class="hidden" @change="onFile" data-testid="choose-photo-input" />
          </label>
        </div>
      </div>
      <div class="flex items-center justify-between gap-4 border-b border-line px-6 py-6">
        <span class="font-medium">Nume de utilizator</span>
        <input v-if="editing" v-model="store.me" @blur="editing = false" @keyup.enter="editing = false" autofocus
          class="border-b border-brand py-1 text-right outline-none" data-testid="username-input" />
        <button v-else @click="editing = true" class="rounded border border-brand px-3 py-1.5 text-xs font-medium text-brand hover:bg-brand-soft" data-testid="change-username-btn">
          Modificare nume de utilizator
        </button>
      </div>
      <div class="grid gap-3 px-6 py-6 md:grid-cols-2">
        <span class="font-medium">Despre tine</span>
        <textarea v-model="store.settings.about" rows="4" placeholder="Spune-ne mai multe despre tine și cărțile tale preferate"
          class="resize-none border-b border-line outline-none focus:border-brand placeholder:text-muted" data-testid="about-input"></textarea>
      </div>
    </div>

    <p class="mt-14 mb-2 px-4 text-sm text-[#4d4d4d]">Locația mea</p>
    <div class="rounded border border-line">
      <SettingsSelect label="Țară" v-model="store.settings.country" :options="['România', 'Republica Moldova']" />
      <SettingsSelect label="Localitate/oraș" v-model="store.settings.city" :options="cities" />
      <div class="flex items-center justify-between px-6 py-5">
        <span class="font-medium">Afișare oraș în profil</span>
        <ToggleSwitch v-model="store.settings.showCity" data-testid="show-city-toggle" />
      </div>
    </div>

    <div class="mt-8 rounded border border-line">
      <SettingsSelect label="Limbă" v-model="store.settings.language" :options="['Română', 'English', 'Français']" last />
    </div>

    <div class="mt-8 flex items-center justify-end gap-4">
      <span v-if="saved" class="text-sm text-brand" data-testid="profile-saved-msg">Profil actualizat</span>
      <button @click="save" class="rounded bg-brand px-4 py-2.5 text-sm text-white hover:bg-brand-dark" data-testid="update-profile-btn">Actualizare profil</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserAvatar from '@/components/UserAvatar.vue'
import ToggleSwitch from './ToggleSwitch.vue'
import SettingsSelect from './SettingsSelect.vue'
import { store, readImage } from '@/stores/books'

const cities = [
  'Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Bistrița-Năsăud', 'Botoșani', 'Brașov', 'Brăila', 'București',
  'Buzău', 'Călărași', 'Caraș-Severin', 'Cluj', 'Constanța', 'Covasna', 'Dâmbovița', 'Dolj', 'Galați', 'Giurgiu',
  'Gorj', 'Hunedoara', 'Ialomița', 'Iași', 'Ilfov', 'Maramureș', 'Mehedinți', 'Mureș', 'Neamț', 'Olt', 'Prahova',
  'Satu Mare', 'Sălaj', 'Sibiu', 'Suceava', 'Teleorman', 'Timiș', 'Tulcea', 'Vaslui', 'Vâlcea', 'Vrancea'
]
const editing = ref(false)
const saved = ref(false)
const onFile = async (e) => { const f = e.target.files[0]; if (f) store.avatar = await readImage(f, 300) }
const save = () => { saved.value = true; setTimeout(() => (saved.value = false), 2500) }
</script>
