<template>
  <div v-if="user" class="mx-auto max-w-[1240px] px-3 pt-8 pb-10" data-testid="user-profile-page">
    <div class="flex flex-col gap-8 sm:flex-row">
      <!-- Avatar -->
      <span
        class="flex h-40 w-40 shrink-0 items-center justify-center rounded-full text-6xl font-semibold text-white uppercase"
        :style="{ backgroundColor: user.avatarColor }"
      >{{ user.username[0] }}</span>

      <div class="flex-1">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 class="text-2xl font-semibold" data-testid="user-profile-username">{{ user.name || user.username }}</h1>
            <p class="mt-0.5 text-sm text-muted">@{{ user.username }}</p>
          </div>
        </div>

        <p class="mt-1 flex items-center text-[#ffb703]">
          <AppIcon v-for="i in 5" :key="i" name="star" :size="18" fill />
          <span class="ml-2 text-sm text-muted">{{ user.swapsCount }} {{ $t('user_profile.ratings') }}</span>
        </p>

        <p v-if="user.about" class="mt-3 max-w-xl text-sm text-[#4d4d4d]">{{ user.about }}</p>

        <div class="mt-6 grid gap-2 border-t border-line pt-4 text-sm text-[#4d4d4d] sm:grid-cols-2">
          <p class="flex items-center gap-2">
            <AppIcon name="pin" :size="18" /> {{ user.location }}, România
          </p>
          <p class="flex items-center gap-2">
            <AppIcon name="swap" :size="18" /> {{ user.swapsCount }} {{ $t('user_profile.swaps_done') }}
          </p>
          <p v-if="user.emailVerified" class="flex items-center gap-2">
            <AppIcon name="check" :size="18" /> {{ $t('user_profile.email_verified') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="mt-10 flex gap-6 border-b border-line">
      <button v-for="tabKey in tabKeys" :key="tabKey" @click="tab = tabKey"
        :class="['-mb-px border-b-2 pb-3 transition-colors', tab === tabKey ? 'border-brand text-brand' : 'border-transparent text-[#4d4d4d]']">
        {{ $t(`user_profile.tab_${tabKey}`) }}
      </button>
    </div>

    <div class="mt-6">
      <template v-if="tab === 'books'">
        <p class="mb-5 text-sm text-muted">{{ userBooks.length }} {{ $t('user_profile.books_available') }}</p>
        <BookGrid v-if="userBooks.length" :books="userBooks" />
        <p v-else class="py-16 text-center text-muted">{{ $t('user_profile.no_books') }}</p>
      </template>

      <div v-else class="max-w-2xl divide-y divide-line" data-testid="user-profile-reviews">
        <div class="py-4 text-sm text-muted">
          <p>{{ $t('user_profile.no_reviews') }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Not found -->
  <div v-else class="py-24 text-center">
    <p class="text-muted">{{ $t('user_profile.not_found') }}</p>
    <router-link to="/" class="mt-4 inline-block text-sm text-brand hover:underline">{{ $t('user_profile.back_home') }}</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/AppIcon.vue'
import BookGrid from '@/components/BookGrid.vue'
import { store } from '@/stores/books'
import usersData from '@/data/users.json'

const route = useRoute()
const { t: $t } = useI18n()

const user = computed(() => {
  const idOrUsername = route.params.id
  return usersData.communityUsers.find(
    (u) => u.id === idOrUsername || u.username === idOrUsername,
  )
})

const tabKeys = ['books', 'reviews']
const tab = ref('books')

const userBooks = computed(() =>
  user.value ? store.books.filter((b) => b.owner === user.value.username) : [],
)
</script>

