<template>
  <div class="mx-auto w-full max-w-4xl py-2">
    <div class="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 class="text-3xl font-bold tracking-tight text-slate-900">Setări Cont</h1>
      <p class="mt-2 text-sm text-slate-500">Gestionează-ți preferințele și detaliile personale</p>
    </div>

    <div class="space-y-5">
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="mb-4 text-xl font-semibold text-slate-900">Informații Personale</h3>
        <div class="space-y-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">Nume complet</label>
            <input type="text" v-model="form.name" placeholder="Numele tău" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-700 focus:bg-white" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">Email</label>
            <input type="email" v-model="form.email" placeholder="email@exemplu.ro" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-700 focus:bg-white" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">Oraș implicit pentru predare</label>
            <input type="text" v-model="form.city" placeholder="Ex: București" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-700 focus:bg-white" />
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="mb-4 text-xl font-semibold text-slate-900">Securitate &amp; Parolă</h3>
        <div class="space-y-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">Parolă actuală</label>
            <input type="password" v-model="form.currentPassword" placeholder="••••••••" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-700 focus:bg-white" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700">Parolă nouă</label>
            <input type="password" v-model="form.newPassword" placeholder="••••••••" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-700 focus:bg-white" />
          </div>
        </div>
      </div>

      <div class="pt-2">
        <button class="inline-flex items-center justify-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800" @click="saveSettings">
          Salvează modificările
        </button>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/settings.js"></script>