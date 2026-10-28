<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" :fill="fill ? 'currentColor' : 'none'" stroke="currentColor"
    :stroke-width="fill ? 0 : 1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path :d="paths[name]" />
  </svg>
</template>

<script setup>
defineProps({ name: String, size: { type: [Number, String], default: 22 }, fill: Boolean })
const paths = {
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M20 20l-4-4',
  mail: 'M3.5 6h17v12h-17z M3.5 6.5l8.5 6.5 8.5-6.5',
  bell: 'M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 1.5h-15z M10 20.5a2 2 0 0 0 4 0',
  heart: 'M12 20s-7.5-4.6-9.2-9.3C1.7 7.4 3.9 4.5 7 4.5c2 0 3.3 1.1 5 3 1.7-1.9 3-3 5-3 3.1 0 5.3 2.9 4.2 6.2C19.5 15.4 12 20 12 20z',
  help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M9.6 9.3a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.2.9-1.2 1.8v.4 M12 17h.01',
  camera: 'M4 8h3.2l1.8-2.5h6l1.8 2.5H20v11H4z M12 16.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  close: 'M6 6l12 12 M18 6L6 18',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 11v5.5 M12 7.6h.01',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  caret: 'M6.5 9.5h11L12 15.5z',
  shield: 'M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z M9 12l2 2 4-4',
  swap: 'M4 8h15 M15 4l4 4-4 4 M20 16H5 M9 12l-4 4 4 4',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  plus: 'M12 5v14 M5 12h14',
  home: 'M4 11l8-7 8 7v9h-5v-6H9v6H4z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5',
  star: 'M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z',
  pin: 'M12 21s-6.5-6-6.5-11a6.5 6.5 0 1 1 13 0c0 5-6.5 11-6.5 11z M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7.5V12l3 2',
  trash: 'M4 7h16 M9 7V4h6v3 M6.5 7l1 13h9l1-13 M10 11v5 M14 11v5',

}
</script>
