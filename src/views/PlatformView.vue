<template>
  <article class="mx-auto max-w-[900px] px-3 py-10 md:py-16" data-testid="platform-page">
    <div class="mb-10 border-b border-line pb-8">
      <p class="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand">ReviveBooks</p>
      <h1 class="text-3xl font-semibold tracking-tight text-ink md:text-4xl" data-testid="platform-title">{{ $t('platform.title') }}</h1>
      <p class="mt-4 max-w-[680px] text-lg leading-8 text-[#4d4d4d]">{{ $t('platform.intro') }}</p>
    </div>
    <div class="grid gap-4 md:grid-cols-3">
      <section v-for="number in 3" :key="number" class="rounded-lg bg-brand-soft p-6" :data-testid="`platform-value-${number}`">
        <h2 class="mb-3 font-semibold text-ink">{{ $t(`platform.value_${number}_title`) }}</h2>
        <p class="text-sm leading-6 text-[#4d4d4d]">{{ $t(`platform.value_${number}_text`) }}</p>
      </section>
    </div>
  </article>
</template>