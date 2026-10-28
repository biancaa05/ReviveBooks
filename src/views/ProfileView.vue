<template>
  <div class="mx-auto max-w-[1240px] px-3 pt-8 pb-10" data-testid="profile-page">
    <div class="flex flex-col gap-8 sm:flex-row">
      <span class="flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-brand text-6xl text-white">{{ initial }}</span>
      <div class="flex-1">
        <h1 class="text-2xl font-semibold" data-testid="profile-username">{{ store.me }}</h1>
        <p class="mt-1 flex items-center text-[#ffb703]"><AppIcon v-for="i in 5" :key="i" name="star" :size="18" fill /><span class="ml-2 text-sm text-muted">{{ reviews.length }} {{ $t('user_profile.ratings') }}</span></p>
        <div class="mt-6 grid gap-2 border-t border-line pt-4 text-sm text-[#4d4d4d] sm:grid-cols-2">
          <p v-if="store.settings.showCity" class="flex items-center gap-2"><AppIcon name="pin" :size="18" /> {{ store.settings.city }}, {{ store.settings.country }}</p>
          <p class="flex items-center gap-2"><AppIcon name="clock" :size="18" /> Online acum</p>
          <p class="flex items-center gap-2"><AppIcon name="swap" :size="18" /> {{ swaps }} schimburi finalizate</p>
          <p class="flex items-center gap-2"><AppIcon name="check" :size="18" /> E-mail verificat</p>
        </div>
      </div>
    </div>

    <div class="mt-10 flex gap-6 border-b border-line">
      <button v-for="tb in tabs" :key="tb.id" @click="tab = tb.id" :data-testid="`profile-tab-${tb.id}`"
        :class="['-mb-px border-b-2 pb-3 transition-colors', tab === tb.id ? 'border-brand text-brand' : 'border-transparent text-[#4d4d4d]']">{{ tb.label }}</button>
    </div>

    <div class="mt-6">
      <template v-if="tab === 'books'">
        <p class="mb-5 text-sm text-muted">{{ mine.length }} {{ $t('user_profile.books_available') }}</p>
        <BookGrid v-if="mine.length" :books="mine" own @delete="askDelete" />
        <p v-else class="py-16 text-center text-muted" data-testid="profile-books-empty">{{ $t('user_profile.no_books') }}</p>
      </template>
      <div v-else class="max-w-2xl divide-y divide-line" data-testid="profile-reviews">
        <div v-for="r in reviews" :key="r.user" class="py-4">
          <p class="font-medium">{{ r.user }}</p>
          <p class="text-[#4d4d4d]">{{ r.text }}</p>
        </div>
      </div>
    </div>

    <ConfirmDialog v-if="deleteId" :title="$t('profile_del.title')" :message="$t('profile_del.text', { title: deleteTitle })"
      :confirm-label="$t('profile_del.confirm')" :cancel-label="$t('common.cancel')" danger
      data-testid="delete-book-dialog" @confirm="confirmDelete" @cancel="deleteId = null" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/AppIcon.vue'
import BookGrid from '@/components/BookGrid.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { store, removeBook } from '@/stores/books'
import { toast } from '@/stores/toast'
import reviews from '@/data/reviews.json'

const { t } = useI18n()
const tabs = computed(() => [
  { id: 'books', label: t('user_profile.tab_books') },
  { id: 'reviews', label: t('user_profile.tab_reviews') },
])
const tab = ref('books')
const swaps = 8
const mine = computed(() => store.books.filter((b) => b.owner === store.me))
const initial = computed(() => (store.me?.[0] || 'U').toUpperCase())

const deleteId = ref(null)
const deleteTitle = computed(() => mine.value.find((b) => b.id === deleteId.value)?.title || '')
const askDelete = (id) => { deleteId.value = id }
const confirmDelete = () => {
  removeBook(deleteId.value)
  deleteId.value = null
  toast(t('toast.book_deleted'))
}
</script>
