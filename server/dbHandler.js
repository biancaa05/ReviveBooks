import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.resolve(__dirname, '../data/db.json')

export function getDb() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const content = fs.readFileSync(DB_PATH, 'utf-8')
      return JSON.parse(content)
    }
    // Seed from JSON data files if db.json does not exist yet
    const booksPath = path.resolve(__dirname, '../src/data/books.json')
    const usersPath = path.resolve(__dirname, '../src/data/users.json')
    const convPath = path.resolve(__dirname, '../src/data/conversations.json')
    const notifPath = path.resolve(__dirname, '../src/data/notifications.json')
    if (fs.existsSync(booksPath)) {
      const books = JSON.parse(fs.readFileSync(booksPath, 'utf-8'))
      const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))
      const conversations = JSON.parse(fs.readFileSync(convPath, 'utf-8'))
      const notifications = JSON.parse(fs.readFileSync(notifPath, 'utf-8'))
      const seed = {
        books,
        conversations,
        notifications,
        favorites: [3, 7, 11],
        settings: users.currentUser,
        user: {
          loggedIn: false,
          me: users.currentUser.username || 'bianca',
          avatar: null,
          isPremium: false,
          readNotifications: false,
        },
      }
      saveDb(seed)
      return seed
    }
  } catch (error) {
    console.error('[DB] Error reading database:', error)
  }
  return null
}

export function saveDb(data) {
  try {
    const dir = path.dirname(DB_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    const newContent = JSON.stringify(data, null, 2)
    if (fs.existsSync(DB_PATH)) {
      const existing = fs.readFileSync(DB_PATH, 'utf-8')
      if (existing === newContent) {
        return true
      }
    }
    fs.writeFileSync(DB_PATH, newContent, 'utf-8')
    return true
  } catch (error) {
    console.error('[DB] Error saving database:', error)
    return false
  }
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.end(JSON.stringify(data))
}

export async function handleApiRequest(req, res, next) {
  // Only handle /api routes
  const parsedUrl = new URL(req.url, 'http://localhost')
  const pathname = parsedUrl.pathname

  if (!pathname.startsWith('/api')) {
    if (next) return next()
    res.statusCode = 404
    res.end()
    return
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.end()
    return
  }

  try {
    // GET /api/db - Read full simulated database
    if (pathname === '/api/db' && req.method === 'GET') {
      const data = getDb()
      if (!data) {
        return sendJson(res, 500, { error: 'Failed to read database' })
      }
      return sendJson(res, 200, data)
    }

    // POST or PUT /api/db - Update full simulated database
    if (pathname === '/api/db' && (req.method === 'POST' || req.method === 'PUT')) {
      const body = await parseJsonBody(req)
      const current = getDb() || {}
      const updated = {
        ...current,
        ...body,
      }
      const success = saveDb(updated)
      if (!success) {
        return sendJson(res, 500, { error: 'Failed to write database' })
      }
      return sendJson(res, 200, { success: true, message: 'Database saved securely' })
    }

    // GET /api/books
    if (pathname === '/api/books' && req.method === 'GET') {
      const data = getDb()
      return sendJson(res, 200, data?.books || [])
    }

    // POST /api/books - Add book
    if (pathname === '/api/books' && req.method === 'POST') {
      const newBook = await parseJsonBody(req)
      const current = getDb() || { books: [] }
      current.books = [newBook, ...(current.books || [])]
      saveDb(current)
      return sendJson(res, 201, newBook)
    }

    // Pass through if unhandled and next exists
    if (next) {
      return next()
    }

    return sendJson(res, 404, { error: 'Endpoint not found' })
  } catch (err) {
    console.error('[DB API Error]', err)
    return sendJson(res, 500, { error: err.message || 'Internal Server Error' })
  }
}

