<template>
  <div class="mx-auto w-full max-w-4xl py-2">
    <div class="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 class="text-3xl font-bold tracking-tight text-slate-900">Mesaje</h1>
      <span v-if="chats.length" class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
        {{ chats.length }} conversații
      </span>
    </div>

    <div class="space-y-3">
      <div v-if="chats.length === 0" class="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-500">
        <p>Nu ai nicio conversație activă.</p>
      </div>

      <div
        v-for="chat in chats"
        :key="chat.id"
        @click="openChat(chat.id)"
        class="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div class="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white" :style="{ backgroundColor: chat.avatarColor }">
          {{ chat.userInitials }}
        </div>

        <div class="min-w-0 flex-1">
          <div class="mb-1 flex items-center justify-between gap-3">
            <h3 class="truncate text-base font-semibold text-slate-900">{{ chat.userName }}</h3>
            <span class="text-[11px] text-slate-400">{{ chat.time }}</span>
          </div>
          <p class="text-sm text-slate-500">Carte: <strong class="text-slate-700">{{ chat.bookTitle }}</strong></p>
          <p class="truncate text-sm text-slate-600">{{ chat.lastMessage }}</p>
        </div>

        <div class="text-xl font-bold text-slate-300">›</div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/chatslist.js"></script>