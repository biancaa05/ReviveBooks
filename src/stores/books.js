import { reactive } from 'vue'

export const categories = ['Ficțiune', 'Sci-Fi & Fantasy', 'Thriller', 'Romance', 'Dezvoltare personală', 'Biografii', 'Istorie', 'Copii', 'Manuale', 'Limbi străine']
export const conditions = ['Nouă', 'Ca nouă', 'Foarte bună', 'Bună', 'Acceptabilă']
export const coverColors = ['#043c25', '#1b4332', '#2d6a4f', '#40916c', '#52b788', '#74c69d', '#0b5d3b', '#285943']

const b = (id, title, author, category, condition, owner, bgColor, likes, wants, extra = {}) => ({
  id, title, author, category, condition, owner, bgColor, likes, wants,
  isPremium: false, language: 'Română', year: 2020, added: 'acum 2 zile',
  description: 'Carte citită o singură dată, păstrată cu grijă, fără sublinieri sau pagini îndoite.',
  ...extra,
})

export const store = reactive({
  loggedIn: false,
  showAuthModal: false,
  me: 'bianca',
  bannerClosed: false,
  favorites: [3, 7, 11],
  
  settings: {
    about: 'Pasionat(ă) de lectură și schimburi de cărți.',
    name: 'Bianca',
    email: 'bianca@example.com',
    location: 'București',
  },

  books: [
    b(1, 'Normal People', 'Sally Rooney', 'Romance', 'Ca nouă', 'ana_p', '#043c25', 166, 'Conversations with Friends', { isPremium: true, language: 'Engleză', year: 2019 }),
    b(2, 'Educated', 'Tara Westover', 'Biografii', 'Bună', 'mihai.d', '#1b4332', 16, 'Orice biografie', { isPremium: true }),
    b(3, 'Atomic Habits', 'James Clear', 'Dezvoltare personală', 'Foarte bună', 'elena_v', '#40916c', 54, 'Deep Work', { year: 2021 }),
    b(4, 'Dune', 'Frank Herbert', 'Sci-Fi & Fantasy', 'Acceptabilă', 'radu_m', '#2d6a4f', 6, 'Fundația - Isaac Asimov'),
    b(5, 'Maitreyi', 'Mircea Eliade', 'Ficțiune', 'Bună', 'kriszi_09', '#0b5d3b', 2, 'Romane clasice românești', { year: 2015 }),
    b(6, 'Baiatul cu pijamale în dungi', 'John Boyne', 'Ficțiune', 'Ca nouă', 'ginaginutza003', '#285943', 21, 'The Book Thief'),
    b(7, 'Fata din tren', 'Paula Hawkins', 'Thriller', 'Foarte bună', 'alexandrub201', '#52b788', 9, 'Gone Girl'),
    b(8, 'The BFG', 'Roald Dahl', 'Copii', 'Nouă', 'inimadecarte', '#74c69d', 33, 'Matilda', { language: 'Engleză' }),
    b(9, 'Bacalaureat Informatică', 'Mariana Miloșescu', 'Manuale', 'Bună', 'dariaiancu33', '#1b4332', 12, 'Culegere matematică M1', { year: 2023 }),
    b(10, 'Sapiens', 'Yuval Noah Harari', 'Istorie', 'Foarte bună', 'deea_44', '#043c25', 88, 'Homo Deus', { isPremium: true }),
    b(11, 'Harry Potter și Piatra Filozofală', 'J.K. Rowling', 'Sci-Fi & Fantasy', 'Bună', 'margo4real', '#2d6a4f', 120, 'Orice volum din serie'),
    b(12, 'Le Petit Prince', 'Antoine de Saint-Exupéry', 'Limbi străine', 'Ca nouă', 'ana_p', '#40916c', 7, 'Cărți în franceză', { language: 'Franceză' }),
    b(13, 'Crimă și pedeapsă', 'F.M. Dostoievski', 'Ficțiune', 'Acceptabilă', 'radu_m', '#0b5d3b', 14, 'Idiotul'),
    b(14, 'It Ends With Us', 'Colleen Hoover', 'Romance', 'Foarte bună', 'kriszi_09', '#52b788', 47, 'It Starts With Us'),
    b(15, 'Steve Jobs', 'Walter Isaacson', 'Biografii', 'Bună', 'mihai.d', '#285943', 5, 'Elon Musk - W. Isaacson'),
    b(16, 'Micul Prinț', 'Antoine de Saint-Exupéry', 'Copii', 'Ca nouă', 'bianca', '#2d6a4f', 3, 'Cărți pentru copii'),
    b(17, '1984', 'George Orwell', 'Ficțiune', 'Foarte bună', 'bianca', '#043c25', 11, 'Ferma animalelor'),
  ],
  conversations: [
    { id: 1, user: 'kriszi_09', bookId: 5, time: 'acum 2 săptămâni', unread: true, messages: [
      { type: 'system', title: 'Schimb propus', time: 'acum 2 săptămâni' },
      { type: 'system', title: 'Schimb acceptat', text: 'Ați căzut de acord asupra schimbului.', time: 'acum 2 săptămâni' },
      { type: 'system', title: 'Cărți expediate', time: 'acum 2 săptămâni' },
      { type: 'system', title: 'Livrat', time: 'acum 2 săptămâni' },
      { type: 'system', title: 'Feedback adăugat!', text: 'Îți mulțumim pentru feedback.', time: 'acum 2 săptămâni' },
      { type: 'system', title: 'Finalizat', text: 'Îți mulțumim că faci schimb de cărți pe ReviveBooks.', time: 'acum 2 săptămâni', cta: true },
    ] },
    { id: 2, user: 'ginaginutza003', bookId: 6, time: 'acum 6 luni', messages: [
      { type: 'them', text: 'Bună! Mai este disponibilă cartea?', time: 'acum 6 luni' },
      { type: 'me', text: 'Da, încă e disponibilă. Ce ai propune la schimb?', time: 'acum 6 luni' },
      { type: 'them', text: 'Baiatul cu pijamale în dungi pentru The Book Thief?', time: 'acum 6 luni' },
    ] },
    { id: 3, user: 'alexandrub201', bookId: 7, time: 'acum 6 luni', messages: [
      { type: 'them', text: 'Am și Gone Girl, facem schimbul?', time: 'acum 6 luni' },
    ] },
    { id: 4, user: 'inimadecarte', bookId: 8, time: 'acum 8 luni', messages: [
      { type: 'me', text: 'The BFG de Roald Dahl (în engleză) e în stare bună?', time: 'acum 8 luni' },
    ] },
    { id: 5, user: 'dariaiancu33', bookId: 9, time: 'acum 8 luni', messages: [
      { type: 'them', text: 'Carte Bacalaureat Informatică — o mai ai?', time: 'acum 8 luni' },
    ] },
    { id: 6, user: 'deea_44', bookId: 10, time: 'acum 9 luni', messages: [
      { type: 'them', text: 'Bună! Ai schimba această carte?', time: 'acum 9 luni' },
    ] },
  ],
  notifications: [
    { id: 1, text: 'kriszi_09 a acceptat propunerea ta de schimb pentru „Maitreyi”.', time: 'acum 2 săptămâni', bookId: 5 },
    { id: 2, text: 'margo4real a adăugat o carte nouă din lista ta de dorințe.', time: 'acum 3 săptămâni', bookId: 11 },
    { id: 3, text: '11 persoane au adăugat „1984” la favorite.', time: 'acum o lună', bookId: 17 },
  ],
  readNotifications: false,
})

export const getBook = (id) => store.books.find((x) => x.id === Number(id))
export const isFav = (id) => store.favorites.includes(id)

export function toggleFav(id) {
  const book = getBook(id)
  const i = store.favorites.indexOf(id)
  if (i >= 0) { store.favorites.splice(i, 1); book.likes-- } else { store.favorites.push(id); book.likes++ }
}

export function startSwap(book, offerTitle) {
  let conv = store.conversations.find((c) => c.bookId === book.id)
  if (!conv) {
    conv = { id: Date.now(), user: book.owner, bookId: book.id, time: 'acum', messages: [] }
    store.conversations.unshift(conv)
  }
  if (offerTitle) conv.messages.push({ type: 'system', title: 'Schimb propus', text: `Ai oferit „${offerTitle}” în schimbul „${book.title}”.`, time: 'acum' })
  return conv.id
}

export function sendMessage(convId, text) {
  const conv = store.conversations.find((c) => c.id === convId)
  conv.messages.push({ type: 'me', text, time: 'acum' })
  conv.time = 'acum'
}

export function addBook(data) {
  const id = Math.max(...store.books.map((x) => x.id)) + 1
  store.books.unshift({ ...data, id, owner: store.me, likes: 0, isPremium: false, added: 'acum' })
  return id
}

export function readImage(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null)
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

export function login(email, password) {
  store.loggedIn = true
  store.showAuthModal = false
}

export function logoutUser() {
  store.loggedIn = false
  store.showAuthModal = true
}