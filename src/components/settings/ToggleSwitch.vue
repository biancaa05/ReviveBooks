<template>
  <button type="button" role="switch" :aria-checked="modelValue" @click="$emit('update:modelValue', !modelValue)"
    :class="['relative h-6 w-10 shrink-0 rounded-full transition-colors', modelValue ? 'bg-brand' : 'bg-[#cfd3d1]']">
    <span :class="['absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform', modelValue ? 'translate-x-4' : '']"></span>
  </button>
</template>

<script setup>
defineProps({ modelValue: Boolean })
defineEmits(['update:modelValue'])
</script>
