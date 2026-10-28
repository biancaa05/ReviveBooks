<template>
  <footer class="border-t border-line bg-white" data-testid="app-footer">
    <div class="mx-auto flex max-w-[1240px] flex-wrap gap-x-6 gap-y-2 px-3 py-8 text-[15px] text-[#4d4d4d]">
      <router-link v-for="link in links" :key="link.to" :to="link.to" class="transition-colors hover:text-brand hover:underline" :data-testid="`footer-link-${link.id}`">
        {{ $t(link.label) }}
      </router-link>
    </div>
    </footer>
</template>

<script setup>
const links = [
  { id: 'privacy', to: '/privacy', label: 'footer.privacy_center' },
  { id: 'cookies', to: '/cookies', label: 'footer.cookie_policy' },
  { id: 'cookie-settings', to: '/cookie-settings', label: 'footer.cookie_settings' },
  { id: 'terms', to: '/terms', label: 'footer.terms' },
  { id: 'platform', to: '/platform', label: 'footer.platform' },
]
</script>
