<template>
  <div class="mx-auto max-w-[920px] px-4 py-10 md:py-14" data-testid="faq-page">
    <header class="mb-10 text-center">
      <span class="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
        <AppIcon name="help" :size="14" /> Ajutor
      </span>
      <h1 class="mt-3 text-[clamp(1.9rem,1.3rem+2.1vw,3rem)] font-semibold leading-tight tracking-[-0.015em] text-ink" data-testid="faq-title">
        Întrebări frecvente
      </h1>
      <p class="mx-auto mt-3 max-w-[52ch] text-[1.02rem] text-[#4d4d4d]">Tot ce trebuie să știi despre schimbul cărților pe ReviveBooks.</p>
    </header>

    <div class="flex flex-col gap-3" data-testid="faq-list">
      <article v-for="(item, i) in items" :key="i"
        :class="['rounded-xl border bg-white transition-all', open === i ? 'border-brand shadow-[0_12px_30px_-18px_rgba(4,60,37,0.3)]' : 'border-line hover:border-line-2']"
        :data-testid="`faq-item-${i}`">
        <button @click="open = open === i ? -1 : i" :data-testid="`faq-toggle-${i}`"
          class="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6">
          <span class="flex items-start gap-3">
            <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-white">{{ i + 1 }}</span>
            <span class="text-[1.02rem] font-semibold text-ink">{{ item.q }}</span>
          </span>
          <AppIcon name="caret" :size="22" fill :class="['shrink-0 text-brand transition-transform', open === i ? 'rotate-0' : '-rotate-90']" />
        </button>
        <div v-if="open === i" class="border-t border-line px-5 pt-4 pb-5 text-[0.98rem] leading-relaxed text-[#4d4d4d] md:px-6" :data-testid="`faq-answer-${i}`">
          {{ item.a }}
        </div>
      </article>
    </div>

    <section class="mt-12 rounded-2xl bg-brand p-7 text-center text-white md:p-10" data-testid="faq-contact">
      <h2 class="text-xl font-semibold md:text-2xl">Ai nevoie de ajutor?</h2>
      <p class="mx-auto mt-2 max-w-[48ch] text-sm text-white/80 md:text-base">Suntem aici să te ajutăm cu comenzi, livrare, întrebări despre cont și orice altceva legat de schimbul de cărți.</p>
      <a href="mailto:ajutor@revivebooks.ro"
        class="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand transition-transform hover:-translate-y-px"
        data-testid="faq-contact-btn">
        <AppIcon name="mail" :size="18" /> ajutor@revivebooks.ro
      </a>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppIcon from '@/components/AppIcon.vue'

const open = ref(0)
const items = computed(() => [
  {
    q: 'Cum adaug o carte la vânzare?',
    a: 'Mergi la pagina „Adaugă o carte”, completezi titlul, autorul, starea cărții și pozele, apoi publici anunțul. Cartea devine vizibilă imediat pentru ceilalți utilizatori.'
  },
  {
    q: 'Cum funcționează schimburile?',
    a: 'Atunci când un cumpărător sau un vânzător este interesat, poți începe un chat și să stabiliți împreună detaliile schimbului, metoda de livrare și condițiile înainte de confirmare.'
  },
  {
    q: 'Cum funcționează livrarea?',
    a: 'Livrarea se gestionează direct între părți. Poți alege curierul și confirma detaliile de expediere din conversație înainte de finalizare.'
  },
  {
    q: 'Pot anula un anunț?',
    a: 'Da. Poți elimina sau modifica un anunț din cont în orice moment înainte ca cartea să fie schimbată cu succes.'
  },
  {
    q: 'De ce să trec la PRO?',
    a: 'PRO îți oferă vizibilitate mai mare, poziționare prioritară în rezultatele căutării și o experiență mai bună la potrivirea cu cumpărători sau vânzători.'
  }
])
</script>
