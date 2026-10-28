<template>
  <div class="mx-auto flex max-w-[720px] flex-col items-center px-4 py-20 text-center md:py-28" data-testid="error-page">
    <p class="font-display text-[clamp(4rem,2rem+6vw,7rem)] font-semibold leading-none tracking-tight text-brand" data-testid="error-code">{{ code }}</p>
    <h1 class="mt-4 text-2xl font-semibold text-ink" data-testid="error-title">{{ title }}</h1>
    <p class="mt-3 max-w-[46ch] leading-relaxed text-[#4d4d4d]" data-testid="error-text">{{ text }}</p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <router-link to="/" class="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark" data-testid="error-home-btn">
        {{ $t('error.back_home') }}
      </router-link>
      <button @click="back" class="rounded-full border border-line-2 px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft" data-testid="error-back-btn">
        {{ $t('error.go_back') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const known = ['400', '403', '404', '500']
const code = computed(() => String(route.params.code || '404'))
const key = computed(() => (known.includes(code.value) ? code.value : '404'))
const title = computed(() => t(`error.title_${key.value}`))
const text = computed(() => t(`error.text_${key.value}`))
const back = () => {
  if (window.history.length > 1) router.back()
  else router.push('/')
}
</script>
