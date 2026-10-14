<template>
  <div class="animate-rise flex flex-wrap items-end justify-between gap-x-6 gap-y-4 mb-7 pb-[22px] border-b border-line">
    <div>
      <span :class="$ui.eyebrow">{{ eyebrow }}</span>
      <h1 class="font-display font-normal tracking-[-0.015em] leading-[1.1] text-[clamp(1.8rem,1.2rem+2.2vw,2.8rem)]" data-testid="page-title">{{ title }}</h1>
      <p v-if="lede" class="text-muted mt-2 max-w-[52ch]">{{ lede }}</p>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PageHead',
  props: { eyebrow: String, title: String, lede: String },
}
</script>
