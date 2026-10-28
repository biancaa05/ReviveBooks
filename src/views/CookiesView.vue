<template>
  <LegalPage :title="$t('cookies.title')" :intro="$t('cookies.intro')" :sections="sections" />
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LegalPage from '@/components/LegalPage.vue'

const { t } = useI18n()
const sections = computed(() => [1, 2, 3, 4].map((number) => ({
  title: t(`cookies.section_${number}_title`),
  text: t(`cookies.section_${number}_text`),
})))
</script>