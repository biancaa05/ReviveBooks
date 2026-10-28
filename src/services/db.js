/**
 * Database Service (Simulated JSON Database)
 *
 * Security rationale:
 * Instead of storing sensitive application state, personal details, and user messages
 * directly in client-side `localStorage` (which is vulnerable to XSS and client-side inspection),
 * we simulate a persistent JSON database located on the backend/server ("elsewhere").
 * This keeps client data decoupled from local browser storage and ensures that data
 * persistence is handled via structured API requests.
 */

const getApiBase = () => '/storeapi'

export async function fetchDatabase() {
  try {
    const res = await fetch(`${getApiBase()}/db`)
    if (res.ok) {
      return await res.json()
    }
  } catch (error) {
    console.warn('[DB Service] Backend simulated database unreachable, using memory fallback:', error?.message || error)
  }
  return null
}

export async function persistDatabase(data) {
  try {
    const res = await fetch(`${getApiBase()}/db`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (error) {
    console.warn('[DB Service] Could not persist to simulated database:', error?.message || error)
  }
  return null
}

let debounceTimer = null

export function debouncedPersistDatabase(data, delay = 300) {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  return new Promise((resolve) => {
    debounceTimer = setTimeout(async () => {
      const result = await persistDatabase(data)
      resolve(result)
    }, delay)
  })
}