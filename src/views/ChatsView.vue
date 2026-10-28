<template>
  <div class="mx-auto max-w-[1240px] px-3 pt-5" data-testid="chats-page">
    <div class="flex h-[780px] max-w-[962px] overflow-hidden border border-line">
      <aside :class="['w-full shrink-0 overflow-y-auto border-r border-line md:block md:w-[300px]', route.params.id ? 'hidden' : 'block']">
        <h2 class="border-b border-line px-4 py-4 font-medium">{{ $t('chats.inbox') }}</h2>
        <div v-if="!store.conversations.length" class="flex flex-col items-center gap-3 px-4 py-16 text-center" data-testid="chats-empty">
          <AppIcon name="mail" :size="36" class="text-brand" />
          <p class="font-medium">{{ $t('chats_empty.title') }}</p>
          <p class="text-sm text-muted">{{ $t('chats_empty.text') }}</p>
          <router-link to="/" class="rounded bg-brand px-4 py-2 text-sm text-white hover:bg-brand-dark" data-testid="chats-empty-cta">{{ $t('chats_empty.cta') }}</router-link>
        </div>
        <router-link v-for="c in store.conversations" :key="c.id" :to="`/chat/${c.id}`" @click="c.unread = false" :data-testid="`conversation-${c.id}`"
          :class="['flex gap-3 border-b border-line px-4 py-4 transition-colors hover:bg-[#f5f5f5]', active?.id === c.id ? 'bg-[#f0f0f0]' : '']">
                    <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg text-white uppercase" :style="{ backgroundColor: bookFor(c).bgColor }">{{ c.user[0] }}</span>
          <span class="min-w-0 flex-1">
            <span class="flex items-baseline justify-between gap-2">
              <span :class="['truncate', c.unread ? 'font-semibold' : 'font-medium']">{{ c.user }}</span>
              <span class="shrink-0 text-sm text-muted">{{ c.time }}</span>
            </span>
            <span class="block truncate text-[#4d4d4d]">{{ preview(c) }}</span>
                        <span class="mt-1 block h-8 w-6 rounded-sm" :style="{ backgroundColor: bookFor(c).bgColor }"></span>
          </span>
        </router-link>
      </aside>

      <section v-if="active" :class="['min-w-0 flex-1 flex-col md:flex', route.params.id ? 'flex' : 'hidden']" data-testid="chat-panel">
        <header class="relative flex items-center justify-center border-b border-line py-4">
          <router-link to="/chats" class="absolute left-4 text-sm text-brand md:hidden">{{ $t('chats.back') }}</router-link>
          <span class="font-medium text-brand" data-testid="chat-username">{{ active.user }}</span>
          <AppIcon name="info" :size="24" class="absolute right-4 text-ink" />
        </header>
        <router-link :to="`/book/${book.id}`" class="flex gap-3 border-b border-line px-4 py-4 hover:bg-[#fafafa]" data-testid="chat-book-strip">
          <span class="h-12 w-12 overflow-hidden rounded-sm"><BookCover :book="book" :badges="false" class="!p-0 text-[0px]" /></span>
          <span>
            <span class="block">{{ book.title }}</span>
            <span class="block text-sm text-[#4d4d4d]">{{ book.author }} · {{ $t('book.wants') }}: {{ book.wants }}</span>
            <span class="flex items-center gap-1 text-brand">{{ $t('book.swap') }} <span class="text-sm">{{ $t('book.free') }}</span> <AppIcon name="shield" :size="13" /></span>
          </span>
        </router-link>

        <div ref="scroller" class="flex-1 overflow-y-auto" data-testid="chat-messages">
          <template v-for="(m, i) in active.messages" :key="i">
            <p class="border-b border-line py-2 text-center text-xs text-[#4d4d4d]">{{ m.time }}</p>
            <div v-if="m.type === 'system'" class="border-b border-line px-4 py-5">
              <p class="font-medium text-[#333]">{{ m.title }}</p>
              <p v-if="m.text" class="text-[#4d4d4d]">{{ m.text }}</p>
              <router-link v-if="m.cta" to="/add" class="mt-4 inline-block rounded bg-brand px-4 py-2 text-sm text-white hover:bg-brand-dark">{{ $t('chats.add_book') }}</router-link>
            </div>
            <div v-else :class="['flex px-4 py-3', m.type === 'me' ? 'justify-end' : '']">
              <p :class="['max-w-[70%] rounded-2xl px-4 py-2', m.type === 'me' ? 'bg-brand text-white' : 'bg-[#f0f0f0]']">{{ m.text }}</p>
            </div>
          </template>
        </div>

        <form @submit.prevent="send" class="flex items-center gap-3 border-t border-line p-2" data-testid="chat-form">
          <AppIcon name="camera" :size="24" class="ml-2 text-muted" />
          <div class="flex flex-1 items-center rounded-md bg-[#f2f2f2]">
            <input v-model="text" :placeholder="$t('chats.type_placeholder')" class="h-11 flex-1 bg-transparent px-3 outline-none" data-testid="chat-input" />
            <button class="px-3 text-muted hover:text-brand" data-testid="chat-send-btn"><AppIcon name="arrow" :size="20" /></button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from '@/components/AppIcon.vue'
import BookCover from '@/components/BookCover.vue'
import { store, getBook, sendMessage } from '@/stores/books'

const route = useRoute()
const text = ref('')
const scroller = ref(null)
const active = computed(() => store.conversations.find((c) => c.id === Number(route.params.id)) || store.conversations[0])
const book = computed(() => getBook(active.value?.bookId) || { bgColor: '#043c25', title: '—', author: '', wants: '' })
const bookFor = (c) => getBook(c.bookId) || { bgColor: '#043c25', title: '—' }
const preview = (c) => { const m = c.messages.at(-1); return m ? (m.text || m.title) : bookFor(c).title }

watch(() => route.params.id, async () => {
  await nextTick()
  if (scroller.value) scroller.value.scrollTop = scroller.value.scrollHeight
}, { immediate: true })

const send = async () => {
  if (!text.value.trim()) return
  sendMessage(active.value.id, text.value.trim())
  text.value = ''
  await nextTick()
  scroller.value.scrollTop = scroller.value.scrollHeight
}
</script>
