<template>
  <article class="mx-auto max-w-[900px] px-3 py-10 md:py-16" data-testid="cookie-settings-page">
    <div class="mb-10 border-b border-line pb-8">
      <p class="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand">ReviveBooks</p>
      <h1 class="text-3xl font-semibold tracking-tight text-ink md:text-4xl" data-testid="cookie-settings-title">{{ $t('cookie_settings.title') }}</h1>
      <p class="mt-4 max-w-[680px] leading-7 text-[#4d4d4d]">{{ $t('cookie_settings.intro') }}</p>
    </div>
    <div class="space-y-4">
      <label v-for="cookie in cookieTypes" :key="cookie.id" class="flex cursor-pointer items-start justify-between gap-6 rounded-lg border border-line p-5 transition-colors hover:border-brand" :data-testid="`cookie-option-${cookie.id}`">
        <span>
          <span class="block font-semibold text-ink">{{ $t(`cookie_settings.${cookie.id}_title`) }}</span>
          <span class="mt-1 block text-sm leading-6 text-muted">{{ $t(`cookie_settings.${cookie.id}_text`) }}</span>
        </span>
        <input v-model="preferences[cookie.id]" :disabled="cookie.required" type="checkbox" class="mt-1 h-5 w-5 accent-brand" :data-testid="`cookie-toggle-${cookie.id}`" />
      </label>
    </div>
    <button type="button" class="mt-8 rounded bg-brand px-5 py-3 font-medium text-white transition-colors hover:bg-brand-dark" data-testid="save-cookie-settings" @click="savePreferences">
      {{ $t('cookie_settings.save') }}
    </button>
    <p v-if="saved" class="mt-4 text-sm font-medium text-brand" data-testid="cookie-settings-saved">{{ $t('cookie_settings.saved') }}</p>
  </article>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const saved = ref(false)
const cookieTypes = [
  { id: 'necessary', required: true },
  { id: 'preferences', required: false },
  { id: 'analytics', required: false },
]
const preferences = reactive({ necessary: true, preferences: true, analytics: false })
const savePreferences = () => {
  localStorage.setItem('revivebooks-cookie-preferences', JSON.stringify(preferences))
  saved.value = true
}
</script>