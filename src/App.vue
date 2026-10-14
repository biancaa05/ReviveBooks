<template>
  <div class="flex min-h-screen flex-col pb-16 md:pb-0">
    <AppHeader />
    <main class="flex-1">
      <router-view />
    </main>
    <AppFooter />
    <nav class="fixed inset-x-0 bottom-0 z-50 flex h-14 items-center justify-around border-t border-line bg-white md:hidden" data-testid="mobile-nav">
      <router-link v-for="l in links" :key="l.to" :to="l.to" class="flex flex-col items-center text-[11px] text-muted" active-class="!text-brand">
        <AppIcon :name="l.icon" :size="22" />{ (l.label) }
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppIcon from '@/components/AppIcon.vue'
const links = [
  { to: '/', icon: 'home', label: 'nav.home' },
  { to: '/favorites', icon: 'heart', label: 'nav.favorites' },
  { to: '/add', icon: 'plus', label: 'nav.add' },
  { to: '/chats', icon: 'mail', label: 'nav.chats' },
  { to: '/profile', icon: 'user', label: 'nav.profile' },
]
</script>
