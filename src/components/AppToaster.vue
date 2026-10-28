<template>
  <div class="pointer-events-none fixed bottom-6 left-1/2 z-[120] flex -translate-x-1/2 flex-col items-center gap-2" data-testid="app-toaster">
    <TransitionGroup name="toast">
      <div v-for="tl in toasts" :key="tl.id" role="status"
        :class="['pointer-events-auto flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lift', tl.type === 'error' ? 'bg-[#e5484d]' : 'bg-brand']"
        :data-testid="`toast-${tl.type}`">
        <AppIcon :name="tl.type === 'error' ? 'close' : 'check'" :size="16" />
        <span>{{ tl.message }}</span>
        <button @click="dismissToast(tl.id)" class="ml-1 rounded-full opacity-70 transition-opacity hover:opacity-100" :data-testid="`toast-dismiss-${tl.id}`">
          <AppIcon name="close" :size="14" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { toasts, dismissToast } from '@/stores/toast'
</script>

<style>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
