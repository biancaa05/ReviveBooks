<template>
  <div class="mx-auto w-full max-w-4xl py-2">
    <div class="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 class="text-3xl font-bold tracking-tight text-slate-900">Istoric Livrări și AWB-uri</h1>
    </div>

    <div class="space-y-4">
      <div v-for="item in deliveries" :key="item.id" class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-slate-900">Schimb: {{ item.bookTitle }}</h3>
          <p class="text-sm text-slate-600"><strong>Curier:</strong> {{ item.courier }}</p>
          <p class="text-sm text-slate-600"><strong>AWB:</strong> <span class="rounded bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700">{{ item.awb }}</span></p>
          <p class="text-sm text-slate-600"><strong>Adresă:</strong> {{ item.address }}</p>
        </div>
        <div class="flex items-center justify-start md:justify-end">
          <span class="inline-flex rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-800">{{ item.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/deliveries.js"></script>