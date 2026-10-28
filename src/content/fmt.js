import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const fmt = (s = '') =>
  esc(s)
    .replace(/\[([^\]]+)\]/g, '<mark class="rb-ph">[$1]</mark>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-ink">$1</strong>')