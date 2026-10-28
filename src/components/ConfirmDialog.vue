<template>
  <div class="fixed inset-0 z-110 flex items-center justify-center bg-black/50 p-4" @click.self="$emit('cancel')" data-testid="confirm-dialog">
    <div class="w-full max-w-400 rounded-2xl bg-white p-7 shadow-xl">
      <h2 class="text-lg font-semibold text-ink" data-testid="confirm-dialog-title">{{ title }}</h2>
      <p class="mt-2 text-sm leading-relaxed text-[#4d4d4d]" data-testid="confirm-dialog-message">{{ message }}</p>
      <div class="mt-6 flex justify-end gap-3">
        <button @click="$emit('cancel')" data-testid="confirm-cancel-btn"
          class="rounded-full border border-line-2 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-soft">
          {{ cancelLabel }}
        </button>
        <button @click="$emit('confirm')" data-testid="confirm-accept-btn"
          :class="['rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors', danger ? 'bg-[#e5484d] hover:bg-[#d13a3f]' : 'bg-brand hover:bg-brand-dark']">
          {{ confirmLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  message: String,
  confirmLabel: { type: String, default: 'OK' },
  cancelLabel: { type: String, default: 'Cancel' },
  danger: Boolean,
})
defineEmits(['confirm', 'cancel'])
</script>
