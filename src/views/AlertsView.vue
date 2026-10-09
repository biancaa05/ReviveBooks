<template>
  <div class="mx-auto w-full max-w-4xl py-2">
    <div class="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 class="text-3xl font-bold tracking-tight text-slate-900">Notificări &amp; Schimburi</h1>
      <span v-if="alerts.length" class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
        {{ alerts.length }} noi
      </span>
    </div>

    <div class="space-y-4">
      <div v-if="alerts.length === 0" class="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-500">
        <p>Nu ai nicio alertă nouă momentan.</p>
      </div>

      <div v-for="alert in alerts" :key="alert.id" class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
        <div class="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white" :style="{ backgroundColor: alert.avatarColor }">
          {{ alert.userInitials }}
        </div>

        <div class="flex-1">
          <p class="text-sm text-slate-700">
            <strong>{{ alert.userName }}</strong> vrea cartea ta
            <span class="font-semibold text-emerald-800">„{{ alert.bookTitle }}”</span>
          </p>
          <span class="mt-1 block text-xs text-slate-400">{{ alert.timeAgo }}</span>
        </div>

        <div class="flex flex-col gap-2 sm:flex-row">
          <button class="inline-flex items-center justify-center rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800" @click="acceptSwap(alert.id)">
            Acceptă &amp; Schimbă
          </button>
          <button class="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50" @click="refuseSwap(alert.id)">
            Refuză
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/alerts.js"></script>