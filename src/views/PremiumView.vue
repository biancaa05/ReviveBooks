<template>
  <div class="mx-auto w-full max-w-5xl py-2">
    <div class="mb-8 rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-8 shadow-sm">
      <h1 class="text-4xl font-bold tracking-tight text-slate-900">ReviveBooks <em class="not-italic text-emerald-800">Premium</em></h1>
      <p class="mt-3 max-w-2xl text-slate-600">Deblochează avantaje exclusive și scoate cărțile tale în lumina reflectoarelor.</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-xl font-semibold text-slate-900">Standard</h3>
        <p class="mt-4 text-3xl font-bold text-slate-900">Gratuit</p>
        <ul class="mt-5 space-y-3 text-sm text-slate-600">
          <li>✔ Schimburi nelimitate de cărți</li>
          <li>✔ Acces la chat și mesagerie</li>
          <li>✖ Vizibilitate prioritară</li>
        </ul>
        <button class="mt-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-500" disabled>Planul tău actual</button>
      </div>

      <div class="rounded-3xl border border-emerald-700 bg-gradient-to-br from-emerald-900 to-emerald-800 p-6 text-white shadow-lg shadow-emerald-900/10">
        <div class="mb-4 inline-flex rounded-full bg-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-900">Cel mai popular</div>
        <h3 class="text-xl font-semibold">PRO Vinted Reader</h3>
        <p class="mt-4 text-3xl font-bold">19.99 RON <span class="text-base font-medium text-emerald-100">/ lună</span></p>
        <ul class="mt-5 space-y-3 text-sm text-emerald-50">
          <li>✔ Cărți promovate în Top pagină</li>
          <li>✔ Fără reclame</li>
          <li>✔ Badge exclusiv PRO pe profil</li>
          <li>✔ Suport prioritar la curierat</li>
        </ul>
        <button class="mt-6 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50" @click="upgradePlan">Treci la PRO</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PremiumView',
  methods: {
    upgradePlan() {
      alert('Felicitări! Ești acum membru PRO pe ReviveBooks.');
    }
  }
}
</script>