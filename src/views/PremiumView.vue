<template>
  <div class="mx-auto max-w-[1080px] px-4 py-10 md:py-14" data-testid="premium-page">
    <section class="mb-10 animate-rise">
      <span class="mb-2.5 flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-3">
        <Sparkles :size="14" /> Premium
      </span>
      <h1 class="font-display font-normal leading-[1.05] tracking-[-0.015em] text-[clamp(2.2rem,1.4rem+3.4vw,4rem)]">
        Upgradează-ți <em class="not-italic text-brand">schimburile</em>
      </h1>
      <p class="mt-3 max-w-[52ch] text-[1.05rem] text-muted">Crește vizibilitatea cărților tale, primește potriviri prioritare și livrează o experiență mai bună pentru fiecare schimb.</p>
      <div v-if="store.isPremium" class="mt-5 inline-flex items-center gap-2 rounded-full bg-brand text-white px-4 py-2 text-sm font-semibold" data-testid="premium-active-badge">
        <AppIcon name="star" :size="16" fill class="text-gold" /> Premium activ
      </div>
    </section>

    <div class="grid gap-5 md:grid-cols-[1fr_1.15fr] md:gap-6">
      <!-- Standard plan -->
      <div class="animate-rise flex flex-col rounded-[20px] border border-line bg-white px-6 py-7 md:px-8 md:py-9" data-testid="plan-standard">
        <h3 class="text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-muted">Standard</h3>
        <p class="mt-2.5 mb-[22px] font-display text-[2.6rem] leading-none">Gratuit</p>
        <ul class="mb-7 flex flex-col gap-3">
          <li v-for="(item, i) in freePerks" :key="i" :class="['flex items-center gap-2.5 text-[0.94rem]', item.off ? 'text-muted line-through' : 'text-ink-2']">
            <component :is="item.off ? X : Check" :size="16" :class="item.off ? 'text-line-2' : 'text-brand-3'" /> {{ item.label }}
          </li>
        </ul>
        <button disabled class="mt-auto h-11 rounded-full border border-line-2 bg-transparent text-brand opacity-55">Planul tău</button>
      </div>

      <div class="animate-rise [animation-delay:100ms] relative flex flex-col overflow-hidden rounded-[20px] bg-brand px-6 py-7 text-[#e9f1ec] shadow-lift after:pointer-events-none after:absolute after:-right-[60px] after:-top-[60px] after:h-[220px] after:w-[220px] after:rounded-full after:border after:border-white/10 after:shadow-[0_0_0_30px_rgba(255,255,255,.03),0_0_0_60px_rgba(255,255,255,.02)] md:px-8 md:py-9" data-testid="plan-pro">
        <span class="mb-4 self-start rounded-full bg-[#d4a441] px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.06em] text-[#2a1d00]">Cel mai popular</span>
        <h3 class="text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-white/70">PRO</h3>
        <p class="mt-2.5 mb-[22px] font-display text-[2.6rem] leading-none text-white">29.99 RON <span class="font-ui text-[0.9rem] text-white/65">/lună</span></p>
        <ul class="mb-7 flex flex-col gap-3">
          <li v-for="(perk, i) in proPerks" :key="i" class="flex items-center gap-2.5 text-[0.94rem]">
            <Check :size="16" class="text-[#d4a441]" /> {{ perk }}
          </li>
        </ul>
        <button @click="openCheckout" :disabled="store.isPremium" data-testid="upgrade-pro-btn"
          class="relative z-10 mt-auto h-12 rounded-full bg-white font-bold text-brand transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,.5)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0">
          {{ store.isPremium ? 'Premium activ' : 'Upgrade la PRO' }}
        </button>
      </div>
    </div>

    <div v-if="showCheckout" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" @click.self="showCheckout = false" data-testid="checkout-modal">
      <div class="relative w-full max-w-[460px] rounded-2xl bg-white p-7 shadow-2xl">
        <button @click="showCheckout = false" class="absolute right-4 top-4 text-ink hover:text-brand" data-testid="checkout-close">
          <AppIcon name="close" :size="22" />
        </button>
        <h2 class="text-xl font-semibold text-ink">Checkout</h2>
        <p class="mt-1 text-sm text-muted">ReviveBooks PRO · <span class="font-semibold text-brand">19.99 RON</span> /lună</p>

        <form @submit.prevent="pay" class="mt-5 flex flex-col gap-3.5" data-testid="checkout-form">
          <label class="flex flex-col gap-1.5">
            <span class="text-[0.78rem] font-semibold text-ink-2">Numele de pe card</span>
            <input v-model="card.name" required data-testid="card-name" class="h-11 rounded-lg border border-line-2 px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" />
          </label>
          <label class="flex flex-col gap-1.5">
            <span class="text-[0.78rem] font-semibold text-ink-2">Numărul cardului</span>
            <input v-model="card.number" required placeholder="4242 4242 4242 4242" inputmode="numeric" maxlength="19" @input="formatCard" data-testid="card-number" class="h-11 rounded-lg border border-line-2 px-3 text-sm tracking-wider outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" />
          </label>
          <div class="grid grid-cols-2 gap-3">
            <label class="flex flex-col gap-1.5">
              <span class="text-[0.78rem] font-semibold text-ink-2">Expirare</span>
              <input v-model="card.expiry" required placeholder="LL/AA" maxlength="5" @input="formatExpiry" data-testid="card-expiry" class="h-11 rounded-lg border border-line-2 px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" />
            </label>
            <label class="flex flex-col gap-1.5">
              <span class="text-[0.78rem] font-semibold text-ink-2">CVC</span>
              <input v-model="card.cvc" required placeholder="123" inputmode="numeric" maxlength="4" data-testid="card-cvc" class="h-11 rounded-lg border border-line-2 px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" />
            </label>
          </div>

          <p class="mt-1 rounded-lg bg-brand-soft px-3 py-2 text-xs text-brand">Informațiile de plată sunt criptate și în siguranță.</p>

          <div class="mt-2 flex gap-3">
            <button type="button" @click="showCheckout = false" class="h-11 flex-1 rounded-full border border-line-2 text-sm font-semibold text-ink hover:bg-brand-soft" data-testid="checkout-cancel">
              Anulează
            </button>
            <button type="submit" class="h-11 flex-[1.3] rounded-full bg-brand text-sm font-bold text-white transition-all hover:-translate-y-px hover:bg-brand-dark" data-testid="checkout-pay">
              Plătește acum
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="successMsg" class="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lift" data-testid="premium-success">
      <span class="mr-1.5">★</span> Premium activat!
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Sparkles, Check, X } from 'lucide-vue-next'
import AppIcon from '@/components/AppIcon.vue'
import { store, activatePremium } from '@/stores/books'

const showCheckout = ref(false)
const successMsg = ref(false)
const card = reactive({ name: '', number: '', expiry: '', cvc: '' })

const freePerks = computed(() => [
  { label: 'Schimburi nelimitate' },
  { label: 'Chat prioritar' },
  { label: 'Loc prioritizat', off: true },
])

const proPerks = computed(() => [
  'Liste promovate',
  'Fără reclame',
  'Livrare gratuită',
  'Badge Premium',
  'Asistență prioritară',
])

const openCheckout = () => { if (!store.isPremium) showCheckout.value = true }

const formatCard = () => {
  card.number = card.number.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')
}
const formatExpiry = () => {
  const v = card.expiry.replace(/\D/g, '').slice(0, 4)
  card.expiry = v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v
}

const pay = () => {
  showCheckout.value = false
  activatePremium()
  successMsg.value = true
  setTimeout(() => (successMsg.value = false), 3200)
}
</script>
