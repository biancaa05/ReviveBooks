<template>
  <LegalPage :title="$t('terms.title')" :intro="$t('terms.intro')" :sections="sections" />
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LegalPage from '@/components/LegalPage.vue'

const { t } = useI18n()
const sections = computed(() => [1, 2, 3, 4].map((number) => ({
  title: t(`terms.section_${number}_title`),
  text: t(`terms.section_${number}_text`),
})))
</script>