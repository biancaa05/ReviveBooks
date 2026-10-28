<template>
  <footer class="mx-auto flex max-w-[1240px] flex-wrap gap-x-6 gap-y-2 px-3 py-6 text-[15px] text-[#4d4d4d]" data-testid="app-footer">
    <a v-for="l in links" :key="l" href="#" class="hover:underline">{{ $t(l) }}</a>
  </footer>
</template>

<script setup>
const links = [
  'footer.privacy_center',
  'footer.cookie_policy',
  'footer.cookie_settings',
  'footer.terms',
  'footer.platform',
]
</script>
