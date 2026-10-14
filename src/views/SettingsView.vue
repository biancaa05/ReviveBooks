<template>
  <div class="mx-auto flex max-w-[1240px] flex-col gap-8 px-3 pt-6 pb-16 md:flex-row" data-testid="settings-page">
    <aside class="shrink-0 md:w-[340px] md:pl-4">
      <h1 class="mb-6 text-2xl font-semibold">Setări</h1>
      <nav class="flex gap-4 overflow-x-auto md:flex-col md:gap-0">
        <router-link v-for="t in tabs" :key="t.id" :to="`/settings/${t.id}`" :data-testid="`settings-tab-${t.id}`"
          :class="['whitespace-nowrap py-3.5 text-[17px] transition-colors hover:text-brand', current === t.id ? 'font-medium text-ink' : 'text-[#4d4d4d]']">
          {{ t.label }}
        </router-link>
      </nav>
    </aside>
    <section class="min-w-0 flex-1 md:max-w-[796px]">
      <component :is="tabs.find((t) => t.id === current).comp" />
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProfileSettings from '@/components/settings/ProfileSettings.vue'
import AccountSettings from '@/components/settings/AccountSettings.vue'
import ShippingSettings from '@/components/settings/ShippingSettings.vue'
import NotificationSettings from '@/components/settings/NotificationSettings.vue'
import PrivacySettings from '@/components/settings/PrivacySettings.vue'
import SecuritySettings from '@/components/settings/SecuritySettings.vue'

const tabs = [
  { id: 'profile', label: 'Detalii profil', comp: ProfileSettings },
  { id: 'account', label: 'Setări cont', comp: AccountSettings },
  { id: 'shipping', label: 'Expediere', comp: ShippingSettings },
  { id: 'notifications', label: 'Notificări', comp: NotificationSettings },
  { id: 'privacy', label: 'Setări de confidențialitate', comp: PrivacySettings },
  { id: 'security', label: 'Securitate', comp: SecuritySettings },
]
const route = useRoute()
const current = computed(() => (tabs.some((t) => t.id === route.params.tab) ? route.params.tab : 'profile'))
</script>
