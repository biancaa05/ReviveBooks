<template>
  <label :class="['grid items-center gap-3 px-6 py-5 md:grid-cols-2', last ? '' : 'border-b border-line']">
    <span class="font-medium">{{ label }}</span>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" :data-testid="`select-${label}`"
      class="border-b border-line bg-white py-1 outline-none focus:border-brand">
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="o in options" :key="o">{{ o }}</option>
    </select>
  </label>
</template>

<script setup>
defineProps({ label: String, modelValue: String, options: Array, last: Boolean, placeholder: String })
defineEmits(['update:modelValue'])
</script>
