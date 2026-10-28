<template>
  <article class="mx-auto max-w-900 px-3 py-10 md:py-16" data-testid="legal-page">
    <div class="mb-10 border-b border-line pb-8">
      <p class="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand">ReviveBooks</p>
      <h1 class="text-3xl font-semibold tracking-tight text-ink md:text-4xl" data-testid="legal-page-title">{{ title }}</h1>
      <p class="mt-4 text-sm text-muted">{{ $t('legal.last_updated') }}</p>
    </div>
    <p class="mb-10 max-w-720 text-lg leading-8 text-[#4d4d4d]" data-testid="legal-page-intro">{{ intro }}</p>
    <div class="space-y-8">
      <section v-for="(section, index) in sections" :key="section.title" class="border-b border-line pb-8 last:border-0" :data-testid="`legal-section-${index + 1}`">
        <h2 class="mb-3 text-xl font-semibold text-ink">{{ section.title }}</h2>
        <p class="leading-7 text-[#4d4d4d]">{{ section.text }}</p>
      </section>
    </div>
  </article>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  intro: { type: String, required: true },
  sections: { type: Array, required: true },
})
</script>