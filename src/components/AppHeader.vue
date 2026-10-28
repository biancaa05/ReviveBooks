<template>
  <header class="sticky top-0 z-50 bg-white" data-testid="app-header">
    <div class="border-b border-line">
      <div class="mx-auto flex h-[54px] max-w-[1240px] items-center gap-4 px-3">
        <router-link to="/" class="relative h-[50px] w-[100px] shrink-0 overflow-hidden" data-testid="header-logo">
          <img src="@/assets/logo.png" alt="ReviveBooks" class="absolute -top-[14px] left-0 h-[92px] w-auto max-w-none" />
        </router-link>

        <form @submit.prevent="search" class="relative hidden h-9 flex-1 items-center rounded-md bg-field md:flex md:ml-8" data-testid="search-form">
          <button type="button" @click="open = open === 'catalog' ? '' : 'catalog'" data-testid="catalog-dropdown-btn"
            class="flex h-full items-center gap-1 border-r border-[#d6d9d8] px-4 text-[15px] text-[#4d4d4d] hover:bg-[#e4e7e6] rounded-l-md">
            {{ $t('header.catalog') }} <AppIcon name="caret" :size="18" fill />
          </button>
          <AppIcon name="search" :size="18" class="ml-3 text-muted" />
          <input v-model="q" :placeholder="$t('header.search_placeholder')" data-testid="search-input"
            class="h-full flex-1 bg-transparent px-2 text-[15px] outline-none placeholder:text-muted" />
          <AppIcon name="camera" :size="20" class="mr-3 text-brand" />
          <div v-if="open === 'catalog'" class="absolute top-11 left-0 w-64 rounded-md border border-line bg-white py-2 shadow-lg" data-testid="catalog-menu">
            <router-link v-for="c in categories" :key="c" :to="{ path: '/', query: { cat: c } }" @click="open = ''"
              class="block px-4 py-2 text-sm hover:bg-brand-soft">{{ $t(`category.${c}`) }}</router-link>
          </div>
        </form>

        <div class="ml-auto flex items-center gap-2 md:ml-6">
          <template v-if="store.loggedIn">
            <router-link to="/chats" class="relative p-2 text-[#4d4d4d] hover:text-brand" data-testid="header-messages-btn">
              <AppIcon name="mail" :size="24" />
              <span v-if="unread" class="absolute top-0.5 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e5484d] px-1 text-[10px] text-white">{{ unread }}</span>
            </router-link>
            <div class="relative">
              <button @click="toggleNotif" class="relative p-2 text-[#4d4d4d] hover:text-brand" data-testid="header-notifications-btn">
                <AppIcon name="bell" :size="24" />
                <span v-if="!store.readNotifications" class="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-[#e5484d]"></span>
              </button>
              <NotificationsDropdown v-if="open === 'notif'" @close="open = ''" />
            </div>
            <router-link to="/favorites" class="p-2 text-[#4d4d4d] hover:text-brand" data-testid="header-favorites-btn">
              <AppIcon name="heart" :size="24" />
            </router-link>
            <div class="relative">
              <button @click="open = open === 'user' ? '' : 'user'" class="flex items-center gap-0.5 p-1" data-testid="header-avatar-btn">
                <span class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-brand text-sm font-medium text-white">
                  <img v-if="store.avatar" :src="store.avatar" class="h-full w-full object-cover" alt="" />
                  <template v-else>{{ (store.me[0] || 'U').toUpperCase() }}</template>
                </span>
                <AppIcon name="caret" :size="14" fill class="text-muted" />
              </button>
              <div v-if="open === 'user'" class="absolute right-0 top-11 w-56 rounded-md border border-line bg-white py-2 shadow-lg" data-testid="user-menu">
                <router-link to="/profile" @click="open = ''" class="block px-4 py-2 text-sm hover:bg-brand-soft" data-testid="menu-profile">{{ $t('header.my_profile') }}</router-link>
                <router-link to="/favorites" @click="open = ''" class="block px-4 py-2 text-sm hover:bg-brand-soft" data-testid="menu-favorites">{{ $t('header.my_favorites') }}</router-link>
                <router-link to="/chats" @click="open = ''" class="block px-4 py-2 text-sm hover:bg-brand-soft" data-testid="menu-swaps">{{ $t('header.my_swaps') }}</router-link>
                <router-link to="/premium" @click="open = ''" class="flex items-center justify-between px-4 py-2 text-sm hover:bg-brand-soft" data-testid="menu-premium">
                  <span class="flex items-center gap-2">
                    <AppIcon name="star" :size="16" fill class="text-[#ffb703]" /> {{ $t('header.premium') }}
                  </span>
                  <span v-if="store.isPremium" class="rounded bg-[#ffb703] px-1.5 py-0.5 text-[10px] font-bold text-black">PRO</span>
                </router-link>
                <router-link to="/settings" @click="open = ''" class="block px-4 py-2 text-sm hover:bg-brand-soft" data-testid="menu-settings">{{ $t('header.settings') }}</router-link>
                <button @click="logout" class="block w-full px-4 py-2 text-left text-sm text-[#e5484d] hover:bg-brand-soft" data-testid="logout-btn">{{ $t('header.logout') }}</button>
              </div>
            </div>
          </template>
          
          <router-link v-else to="/login" data-testid="login-btn"
            class="rounded border border-brand px-3 py-1.5 text-[13px] text-brand transition-colors hover:bg-brand-soft">
            {{ $t('header.register') }} <span class="mx-0.5 opacity-50">|</span> {{ $t('header.login') }}
          </router-link>

          <router-link to="/add" class="ml-1 rounded bg-brand px-3 py-2 text-[13px] text-white transition-colors hover:bg-brand-dark" data-testid="header-add-book-btn">
            {{ $t('header.add_book') }}
          </router-link>
          <router-link to="/faq" class="hidden p-2 text-[#4d4d4d] hover:text-brand md:block lg:ml-3" data-testid="header-help-btn">
            <AppIcon name="help" :size="26" />
          </router-link>
          <button @click="toggleLocale" class="flex items-center text-sm font-medium text-[#4d4d4d] hover:text-brand ml-1 lg:ml-4" data-testid="header-lang-btn">
            {{ locale.toUpperCase() }} <AppIcon name="caret" :size="18" fill />
          </button>
        </div>
      </div>
    </div>

    <form @submit.prevent="search" class="mx-3 mb-3 flex h-10 items-center rounded-md bg-field md:hidden" data-testid="search-form-mobile">
      <AppIcon name="search" :size="18" class="ml-3 text-muted" />
      <input v-model="q" :placeholder="$t('header.search_placeholder')" data-testid="search-input-mobile"
        class="h-full min-w-0 flex-1 bg-transparent px-2 text-[15px] outline-none placeholder:text-muted" />
    </form>
    
    <nav class="hidden border-b border-line md:block" data-testid="category-nav">
      <div class="mx-auto flex max-w-[1240px] gap-1 overflow-x-auto px-3">
        <router-link v-for="c in categories" :key="c" :to="{ path: '/', query: { cat: c } }" :data-testid="`category-link-${c}`"
          :class="['whitespace-nowrap px-4 py-3 text-[15px] transition-colors hover:text-brand', route.query.cat === c ? 'text-brand font-medium' : 'text-[#4d4d4d]']">
          {{ $t(`category.${c}`) }}
        </router-link>
      </div>
    </nav>

    <div v-if="open" class="fixed inset-0 -z-10" @click="open = ''"></div>

    <AuthModal v-if="store.showAuthModal" @close="store.showAuthModal = false" />
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import NotificationsDropdown from './NotificationsDropdown.vue'
import AuthModal from './settings/AuthModal.vue'
import { store, categories, logoutUser } from '@/stores/books'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const q = ref('')
const open = ref('')
const unread = computed(() => store.conversations.filter((c) => c.unread).length)

watch(
  () => store.settings.language,
  (lang) => {
    if (lang === 'English' && locale.value !== 'en') locale.value = 'en'
    else if (lang === 'Română' && locale.value !== 'ro') locale.value = 'ro'
  },
  { immediate: true },
)

const search = () => { open.value = ''; router.push({ path: '/', query: q.value ? { q: q.value } : {} }) }
const toggleNotif = () => { open.value = open.value === 'notif' ? '' : 'notif'; store.readNotifications = true }
const toggleLocale = () => {
  locale.value = locale.value === 'ro' ? 'en' : 'ro'
  store.settings.language = locale.value === 'ro' ? 'Română' : 'English'
}
const logout = () => { logoutUser(); open.value = ''; router.push('/') }
</script>
