<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" @click.self="close" data-testid="auth-modal">
    <div class="relative w-full max-w-[375px] rounded-lg bg-white px-6 pt-12 pb-6 shadow-xl">
      <button @click="close" class="absolute top-4 right-4 text-ink hover:text-brand" data-testid="auth-close-btn"><AppIcon name="close" :size="22" /></button>
      <button v-if="step === 'email'" @click="step = 'choose'" class="absolute top-4 left-4 rotate-180 text-ink hover:text-brand" data-testid="auth-back-btn"><AppIcon name="arrow" :size="22" /></button>

      <template v-if="step === 'choose'">
        <h2 class="mb-6 text-center text-2xl font-medium">{{ register ? 'Alătură-te și schimbă cărți' : 'Bine ai revenit!' }}</h2>
        <div class="flex flex-col gap-3">
          <button v-for="p in providers" :key="p.id" @click="social(p.id)" :data-testid="`auth-${p.id}-btn`"
            class="flex h-11 items-center justify-center gap-3 rounded border border-[#c9cccb] text-[15px] transition-colors hover:bg-[#f5f6f5]">
            <span v-html="p.icon" class="h-5 w-5"></span> Continuă cu {{ p.label }}
          </button>
        </div>
        <p class="mt-6 text-center text-sm text-[#4d4d4d]">
          Sau {{ register ? 'înregistrează-te' : 'conectează-te' }} cu
          <button @click="step = 'email'" class="text-brand underline" data-testid="auth-email-link">e-mail</button>
        </p>
        <p class="mt-6 text-center text-sm text-[#4d4d4d]">
          {{ register ? 'Ai deja un cont?' : 'Nu ai un cont ReviveBooks?' }}
          <button @click="register = !register" class="text-brand underline" data-testid="auth-toggle-mode">{{ register ? 'Conectează-te' : 'Înregistrează-te' }}</button>
        </p>
      </template>

      <form v-else @submit.prevent="submit" class="flex flex-col gap-5" data-testid="auth-email-form">
        <h2 class="mb-1 text-center text-2xl font-medium">{{ register ? 'Înregistrează-te cu e-mail' : 'Conectează-te' }}</h2>
        <input v-if="register" v-model="form.username" required placeholder="Nume de utilizator" class="border-b border-line py-2 outline-none focus:border-brand" data-testid="auth-username-input" />
        <input v-model="form.email" required type="email" :placeholder="register ? 'E-mail' : 'E-mail sau nume de utilizator'" class="border-b border-line py-2 outline-none focus:border-brand" data-testid="auth-email-input" />
        <input v-model="form.password" required type="password" minlength="6" placeholder="Parolă" class="border-b border-line py-2 outline-none focus:border-brand" data-testid="auth-password-input" />
        <label v-if="register" class="flex gap-2 text-xs text-[#4d4d4d]">
          <input type="checkbox" required class="accent-brand" data-testid="auth-terms-checkbox" />
          Accept Termenii și condițiile ReviveBooks și Politica de confidențialitate.
        </label>
        <button class="h-11 rounded bg-brand text-white transition-colors hover:bg-brand-dark" data-testid="auth-submit-btn">
          {{ register ? 'Continuă' : 'Conectează-te' }}
        </button>
        <button v-if="!register" type="button" @click="forgot = true" class="text-center text-sm text-brand underline" data-testid="auth-forgot-btn">Ai uitat parola?</button>
        <p v-if="forgot" class="text-center text-xs text-muted">Ți-am trimis un link de resetare pe e-mail.</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import AppIcon from '../AppIcon.vue'
import { store, login } from '@/stores/books'

const step = ref('choose')
const register = ref(store.authMode === 'register')
const forgot = ref(false)
const form = reactive({ username: '', email: '', password: '' })
const providers = [
  { id: 'google', label: 'Google', icon: '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.5z"/><path fill="#34A853" d="M12 23.5c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A11.5 11.5 0 0 0 12 23.5z"/><path fill="#FBBC05" d="M5.6 14.2a6.9 6.9 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4z"/><path fill="#EA4335" d="M12 5.1c1.7 0 3.2.6 4.4 1.7l3.3-3.3A11.5 11.5 0 0 0 1.8 6.8l3.8 3c.9-2.7 3.4-4.7 6.4-4.7z"/></svg>' },
  { id: 'facebook', label: 'Facebook', icon: '<svg viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/></svg>' },
]
const close = () => { store.authOpen = false }
const social = (id) => { login(); store.settings[id] = true }
const submit = () => login(register.value ? form.username.trim() : '', form.email)
</script>
