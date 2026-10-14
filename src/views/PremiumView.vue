<template>
<<<<<<< HEAD
  <div class="max-w-[980px]">
    <section class="animate-rise mb-9">
      <span :class="$ui.eyebrow"><Sparkles :size="14" /> Abonament</span>
      <h1 class="font-display font-normal leading-[1.05] tracking-[-0.015em] text-[clamp(2.2rem,1.4rem+3.4vw,4rem)]">ReviveBooks <em class="text-brand">Premium</em></h1>
      <p class="mt-3 text-muted text-[1.05rem] max-w-[46ch]">Deblochează avantaje exclusive și scoate cărțile în evidență!</p>
    </section>

    <div class="grid gap-4 md:grid-cols-[1fr_1.15fr] md:gap-6">
      <div :class="[$ui.panel, 'animate-rise flex flex-col px-6 py-7 md:px-8 md:py-9']" data-testid="plan-standard">
        <h3 class="text-[0.82rem] font-semibold tracking-[0.14em] uppercase text-muted">Standard</h3>
        <p class="mt-2.5 mb-[22px] font-display text-[2.6rem] leading-none">Gratuit</p>
        <ul class="flex flex-col gap-3 mb-7">
          <li v-for="f in free" :key="f.t" :class="['flex items-center gap-2.5 text-[0.94rem]', f.off ? 'text-muted line-through' : 'text-ink-2']">
            <component :is="f.off ? 'X' : 'Check'" :size="16" :class="f.off ? 'text-line-2' : 'text-brand-3'" /> {{ f.t }}
          </li>
        </ul>
        <button :class="[$ui.btnOutline, 'w-full mt-auto']" disabled>Planul tău actual</button>
      </div>

      <div class="animate-rise [animation-delay:100ms] relative overflow-hidden flex flex-col px-6 py-7 md:px-8 md:py-9 rounded-[20px] bg-brand text-[#e9f1ec] shadow-lift after:absolute after:-right-[60px] after:-top-[60px] after:w-[220px] after:h-[220px] after:rounded-full after:border after:border-white/10 after:shadow-[0_0_0_30px_rgba(255,255,255,.03),0_0_0_60px_rgba(255,255,255,.02)] after:pointer-events-none" data-testid="plan-pro">
        <span class="self-start mb-4 px-2.5 py-1 rounded-full bg-gold text-[#2a1d00] text-[0.7rem] font-bold tracking-[0.06em] uppercase">Cel mai popular</span>
        <h3 class="text-[0.82rem] font-semibold tracking-[0.14em] uppercase text-white/70">PRO Vinted Reader</h3>
        <p class="mt-2.5 mb-[22px] font-display text-[2.6rem] leading-none text-white">19.99 RON <span class="font-ui text-[0.9rem] text-white/65">/ lună</span></p>
        <ul class="flex flex-col gap-3 mb-7">
          <li v-for="t in pro" :key="t" class="flex items-center gap-2.5 text-[0.94rem]"><Check :size="16" class="text-gold" /> {{ t }}</li>
        </ul>
        <button class="relative z-10 mt-auto h-12 rounded-full bg-white text-brand font-bold cursor-pointer transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,.5)]" data-testid="upgrade-pro-btn" @click="upgradePlan">Treci la PRO</button>
=======
  <div class="premium-page">
    <div class="premium-hero">
      <h1>✨ ReviveBooks Premium</h1>
      <p>Deblochează avantaje exclusive și scoate cărțile în evidență!</p>
    </div>

    <div class="premium-cards-grid">
      <div class="premium-card">
        <h3>Standard</h3>
        <p class="price">Gratuit</p>
        <ul>
          <li>✔ Schimburi nelimitate de cărți</li>
          <li>✔ Acces la chat și mesagerie</li>
          <li>✖ Vizibilitate prioritară</li>
        </ul>
        <button class="vinted-btn-outline" disabled>Planul tău actual</button>
      </div>

      <div class="premium-card featured">
        <div class="badge-popular">Cel mai popular</div>
        <h3>PRO Vinted Reader</h3>
        <p class="price">19.99 RON <span>/ lună</span></p>
        <ul>
          <li>✔ Cărți promovate în Top pagină</li>
          <li>✔ Fără reclame</li>
          <li>✔ Badge exclusiv PRO pe profil</li>
          <li>✔ Suport prioritar la curierat</li>
        </ul>
        <button class="vinted-btn-primary" @click="upgradePlan">Treci la PRO</button>
>>>>>>> f152b90 (Added all pages and some functionalities)
      </div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import { Sparkles, Check, X } from 'lucide-vue-next'

export default {
  name: 'PremiumView',
  components: { Sparkles, Check, X },
  data() {
    return {
      free: [
        { t: 'Schimburi nelimitate de cărți' },
        { t: 'Acces la chat și mesagerie' },
        { t: 'Vizibilitate prioritară', off: true }
      ],
      pro: ['Cărți promovate în Top pagină', 'Fără reclame', 'Badge exclusiv PRO pe profil', 'Suport prioritar la curierat']
    }
  },
  methods: {
    upgradePlan() {
      alert('Felicitări! Ești acum membru PRO pe ReviveBooks.')
=======
export default {
  name: 'PremiumView',
  methods: {
    upgradePlan() {
      alert('Felicitări! Ești acum membru PRO pe ReviveBooks.');
>>>>>>> f152b90 (Added all pages and some functionalities)
    }
  }
}
</script>
<<<<<<< HEAD
=======

<style src="@/assets/css/premium.css"></style>
>>>>>>> f152b90 (Added all pages and some functionalities)
