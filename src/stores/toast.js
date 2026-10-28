import { reactive } from 'vue'

export const toasts = reactive([])
let seq = 0

export function toast(message, type = 'success', timeout = 3200) {
  const id = ++seq
  toasts.push({ id, message, type })
  if (timeout) setTimeout(() => dismissToast(id), timeout)
  return id
}

export function dismissToast(id) {
  const i = toasts.findIndex((t) => t.id === id)
  if (i >= 0) toasts.splice(i, 1)
}