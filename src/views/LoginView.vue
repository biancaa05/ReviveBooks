<template>
  <div class="relative min-h-[calc(100vh-54px)] overflow-hidden bg-brand-soft" data-testid="login-page">
    <!-- Decorative background -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -left-32 -top-24 h-96 w-96 rounded-full bg-brand/10 blur-3xl"></div>
      <div class="absolute -right-28 bottom-10 h-[28rem] w-[28rem] rounded-full bg-leaf/15 blur-3xl"></div>
    </div>

    <div class="relative mx-auto grid max-w-[1240px] gap-10 px-4 py-10 md:grid-cols-[1.1fr_1fr] md:gap-16 md:py-16 lg:py-20">
      <!-- Left: Pitch -->
      <section class="hidden flex-col justify-center md:flex" data-testid="login-pitch">
        <span class="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          <AppIcon name="swap" :size="14" /> Comunitate de cititori
        </span>
        <h2 class="text-[clamp(2rem,1.2rem+2.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink">
          Dă-le cărților tale
          <br />
          <em class="not-italic text-brand">o nouă viață.</em>
        </h2>
        <p class="mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed text-[#4d4d4d]">
          Conectează-te și începe să schimbi cărți cu alți pasionați. Fără bani — doar povești care își găsesc un nou cititor.
        </p>
        <ul class="mt-8 flex flex-col gap-3 text-[0.95rem] text-ink-2">
          <li class="flex items-center gap-3"><span class="grid h-7 w-7 place-items-center rounded-full bg-brand text-white"><AppIcon name="check" :size="16" /></span>Peste 10.000 de cărți disponibile</li>
          <li class="flex items-center gap-3"><span class="grid h-7 w-7 place-items-center rounded-full bg-brand text-white"><AppIcon name="check" :size="16" /></span>Schimburi 100% gratuite</li>
          <li class="flex items-center gap-3"><span class="grid h-7 w-7 place-items-center rounded-full bg-brand text-white"><AppIcon name="check" :size="16" /></span>Curier la ușa ta</li>
        </ul>
      </section>

      <!-- Right: Card -->
      <section class="relative mx-auto w-full max-w-[460px]" data-testid="login-card">
        <div class="rounded-2xl border border-line bg-white p-7 shadow-[0_18px_40px_-20px_rgba(4,60,37,0.2)] md:p-9">
          <h1 class="text-center text-2xl font-semibold text-ink" data-testid="login-title">
            {{ isRegister ? 'Începe acum' : 'Autentificare' }}
          </h1>
          <p class="mt-2 text-center text-sm text-[#4d4d4d]">Intră în comunitatea de cititori ReviveBooks.</p>

          <div class="mt-7 flex flex-col gap-3">
            <button @click="social('google')" data-testid="social-google-btn"
              class="flex h-11 items-center justify-center gap-3 rounded-lg border border-[#c9cccb] bg-white text-[15px] font-medium text-ink transition-all hover:border-brand hover:bg-brand-soft/40">
              <svg viewBox="0 0 24 24" class="h-5 w-5"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.5z"/><path fill="#34A853" d="M12 23.5c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A11.5 11.5 0 0 0 12 23.5z"/><path fill="#FBBC05" d="M5.6 14.2a6.9 6.9 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4z"/><path fill="#EA4335" d="M12 5.1c1.7 0 3.2.6 4.4 1.7l3.3-3.3A11.5 11.5 0 0 0 1.8 6.8l3.8 3c.9-2.7 3.4-4.7 6.4-4.7z"/></svg>
              Continuă cu Google
            </button>
            <button @click="social('facebook')" data-testid="social-facebook-btn"
              class="flex h-11 items-center justify-center gap-3 rounded-lg border border-[#c9cccb] bg-white text-[15px] font-medium text-ink transition-all hover:border-brand hover:bg-brand-soft/40">
              <svg viewBox="0 0 24 24" class="h-5 w-5"><path fill="#1877F2" d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/></svg>
              Continuă cu Facebook
            </button>
          </div>

          <div class="my-6 flex items-center gap-3">
            <span class="h-px flex-1 bg-line"></span>
            <span class="text-xs uppercase tracking-[0.14em] text-muted">sau continuă cu email</span>
            <span class="h-px flex-1 bg-line"></span>
          </div>

          <form @submit.prevent="submit" class="flex flex-col gap-4" data-testid="login-form">
            <label v-if="isRegister" class="flex flex-col gap-1.5">
              <span class="text-[0.78rem] font-semibold text-ink-2">Nume utilizator</span>
              <input v-model="form.username" required minlength="3" data-testid="login-username-input"
                class="h-11 rounded-lg border border-line-2 bg-white px-3.5 text-[15px] outline-none transition-[border-color,box-shadow] focus:border-brand focus:ring-4 focus:ring-brand/10" />
            </label>
            <label class="flex flex-col gap-1.5">
              <span class="text-[0.78rem] font-semibold text-ink-2">{{ isRegister ? 'Email' : 'Email sau nume utilizator' }}</span>
              <input v-model="form.email" required :type="isRegister ? 'email' : 'text'" data-testid="login-email-input"
                class="h-11 rounded-lg border border-line-2 bg-white px-3.5 text-[15px] outline-none transition-[border-color,box-shadow] focus:border-brand focus:ring-4 focus:ring-brand/10" />
            </label>
            <label class="flex flex-col gap-1.5">
              <span class="text-[0.78rem] font-semibold text-ink-2">Parolă</span>
              <div class="relative">
                <input v-model="form.password" required minlength="6" :type="showPw ? 'text' : 'password'" data-testid="login-password-input"
                  class="h-11 w-full rounded-lg border border-line-2 bg-white pl-3.5 pr-11 text-[15px] outline-none transition-[border-color,box-shadow] focus:border-brand focus:ring-4 focus:ring-brand/10" />
                <button type="button" @click="showPw = !showPw" data-testid="toggle-password-visibility"
                  class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-brand hover:bg-brand-soft">
                  {{ showPw ? 'Ascunde' : 'Arată' }}
                </button>
              </div>
            </label>

            <div class="flex items-center justify-between text-sm">
              <label v-if="!isRegister" class="flex items-center gap-2 text-[#4d4d4d]">
                <input v-model="form.remember" type="checkbox" class="accent-brand" data-testid="remember-checkbox" />
                Ține-mă minte
              </label>
              <button v-if="!isRegister" type="button" @click="forgot = true" class="ml-auto text-sm text-brand hover:underline" data-testid="forgot-btn">
                Ai uitat parola?
              </button>
              <label v-else class="flex items-start gap-2 text-xs text-[#4d4d4d]">
                <input v-model="form.terms" type="checkbox" required class="mt-0.5 accent-brand" data-testid="terms-checkbox" />
                <span>Accept termenii și condițiile</span>
              </label>
            </div>

            <p v-if="forgot" class="rounded-lg bg-brand-soft px-4 py-3 text-center text-xs text-brand" data-testid="forgot-msg">Instrucțiunile de resetare au fost trimise.</p>
            <p v-if="error" class="rounded-lg bg-[#fdecec] px-4 py-3 text-center text-xs text-[#e5484d]" data-testid="login-error">{{ error }}</p>

            <button type="submit" data-testid="login-submit-btn"
              class="h-12 rounded-full bg-brand font-semibold text-white transition-all hover:-translate-y-px hover:bg-brand-dark hover:shadow-[0_12px_24px_-10px_rgba(4,60,37,0.5)]">
              {{ isRegister ? 'Continuă' : 'Autentifică-te' }}
            </button>
          </form>

          <p class="mt-6 text-center text-sm text-[#4d4d4d]">
            {{ isRegister ? 'Ai deja un cont?' : 'Ești nou aici?' }}
            <button @click="toggleMode" class="font-semibold text-brand underline-offset-2 hover:underline" data-testid="toggle-register">
              {{ isRegister ? 'Autentifică-te' : 'Creează cont' }}
            </button>
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/AppIcon.vue'
import { login, store } from '@/stores/books'

const router = useRouter()
const isRegister = ref(false)
const showPw = ref(false)
const forgot = ref(false)
const error = ref('')
const form = reactive({ username: '', email: '', password: '', remember: true, terms: false })

const toggleMode = () => { isRegister.value = !isRegister.value; error.value = '' }

const social = (provider) => {
  login('bianca', 'bianca@example.com')
  store.settings[provider] = true
  router.push('/')
}

const submit = () => {
  error.value = ''
  const emailOk = isRegister.value ? /.+@.+\..+/.test(form.email) : form.email.trim().length >= 3
  const pwOk = form.password.length >= 6
  if (!emailOk || !pwOk) { error.value = 'Datele introduse nu sunt valide.'; return }
  const username = isRegister.value ? form.username.trim() : (form.email.includes('@') ? form.email.split('@')[0] : form.email.trim())
  login(username, isRegister.value ? form.email : (form.email.includes('@') ? form.email : store.settings.email))
  router.push('/')
}
</script>
