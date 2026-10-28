import { reactive, watch, nextTick } from 'vue'
import { fetchDatabase, debouncedPersistDatabase } from '../services/db.js'
import booksData from '@/data/books.json'
import usersData from '@/data/users.json'
import conversationsData from '@/data/conversations.json'
import notificationsData from '@/data/notifications.json'
import categoriesData from '@/data/categories.json'

export const categories = categoriesData.categories
export const conditions = categoriesData.conditions
export const coverColors = categoriesData.coverColors
export const DEFAULT_COVER_COLOR = categoriesData.defaultCoverColor

export function getCurrentTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export const defaultSettings = () => ({ ...usersData.currentUser })

export const store = reactive({
  ready: false,
  loggedIn: false,
  showAuthModal: false,
  authMode: 'login',
  me: usersData.currentUser.username || 'bianca',
  avatar: null,
  isPremium: false,
  bannerClosed: false,
  favorites: [3, 7, 11],
  settings: defaultSettings(),
  books: booksData,
  conversations: conversationsData,
  notifications: notificationsData,
  readNotifications: false,
})

let isReady = false
let lastSavedJson = ''

export async function initStoreFromDb() {
  try {
    const data = await fetchDatabase()
    if (data) {
      if (Array.isArray(data.books) && data.books.length > 0) store.books = data.books
      if (Array.isArray(data.conversations)) store.conversations = data.conversations
      if (Array.isArray(data.notifications)) store.notifications = data.notifications
      if (Array.isArray(data.favorites)) store.favorites = data.favorites
      if (data.settings && typeof data.settings === 'object') {
        store.settings = { ...defaultSettings(), ...data.settings }
      }
      if (typeof data.loggedIn === 'boolean') store.loggedIn = data.loggedIn
      if (typeof data.me === 'string') store.me = data.me
      if (data.avatar !== undefined) store.avatar = data.avatar
      if (typeof data.isPremium === 'boolean') store.isPremium = data.isPremium
      if (typeof data.readNotifications === 'boolean') store.readNotifications = data.readNotifications
    }
  } catch (err) {
    console.warn('[Store] Could not load from simulated DB:', err)
  } finally {
    await nextTick()
    lastSavedJson = JSON.stringify(getPersistPayload())
    isReady = true
    store.ready = true
  }
}

initStoreFromDb()

const getPersistPayload = () => ({
  loggedIn: store.loggedIn,
  me: store.me,
  avatar: store.avatar,
  isPremium: store.isPremium,
  favorites: store.favorites,
  settings: store.settings,
  books: store.books,
  conversations: store.conversations,
  notifications: store.notifications,
  readNotifications: store.readNotifications,
})

watch(
  getPersistPayload,
  (val) => {
    if (!isReady) return
    const currentJson = JSON.stringify(val)
    if (currentJson === lastSavedJson) return
    lastSavedJson = currentJson
    debouncedPersistDatabase(val)
  },
  { deep: true },
)

export const getBook = (id) => store.books.find((x) => x.id === Number(id))
export const isFav = (id) => store.favorites.includes(id)

export function toggleFav(id) {
  const book = getBook(id)
  const i = store.favorites.indexOf(id)
  if (i >= 0) {
    store.favorites.splice(i, 1)
    if (book) book.likes--
  } else {
    store.favorites.push(id)
    if (book) book.likes++
  }
  debouncedPersistDatabase(getPersistPayload())
}

export function startSwap(book, offerTitle) {
  const time = getCurrentTime()
  let conv = store.conversations.find((c) => c.bookId === book.id)
  if (!conv) {
    conv = { id: Date.now(), user: book.owner, bookId: book.id, time, messages: [] }
    store.conversations.unshift(conv)
  }
  if (offerTitle) {
    conv.messages.push({
      type: 'system',
      title: 'Schimb propus',
      text: `Ai oferit „${offerTitle}" în schimbul „${book.title}".`,
      time,
    })
  }
  debouncedPersistDatabase(getPersistPayload())
  return conv.id
}

export function sendMessage(convId, text) {
  const conv = store.conversations.find((c) => c.id === convId)
  if (!conv) return
  const time = getCurrentTime()
  conv.messages.push({ type: 'me', text, time })
  conv.time = time
  debouncedPersistDatabase(getPersistPayload())
}

export function addBook(data) {
  const id = Math.max(...store.books.map((x) => x.id), 0) + 1
  const images = Array.isArray(data.images) ? data.images.filter(Boolean) : []
  const useDefaultCover = images.length === 0
  const time = getCurrentTime()
  store.books.unshift({
    ...data,
    id,
    images,
    bgColor: useDefaultCover ? DEFAULT_COVER_COLOR : (data.bgColor || DEFAULT_COVER_COLOR),
    owner: store.me,
    likes: 0,
    isPremium: store.isPremium,
    added: time,
  })
  debouncedPersistDatabase(getPersistPayload())
  return id
}

export function removeBook(id) {
  store.books = store.books.filter((b) => b.id !== id)
  store.favorites = store.favorites.filter((f) => f !== id)
}


export function readImage(file) {
  return new Promise((resolve, reject) => {
    if (!file) { resolve(null); return }
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

export function login(username, email) {
  store.loggedIn = true
  store.showAuthModal = false
  if (username) store.me = username
  if (email) store.settings.email = email
  debouncedPersistDatabase(getPersistPayload())
}

export function logoutUser() {
  store.loggedIn = false
  store.isPremium = false
  debouncedPersistDatabase(getPersistPayload())
}

export function activatePremium() {
  store.isPremium = true
  debouncedPersistDatabase(getPersistPayload())
}
