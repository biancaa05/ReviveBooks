import http from 'node:http'
import { handleApiRequest } from './dbHandler.js'

const PORT = process.env.PORT || 3001

const server = http.createServer(async (req, res) => {
  await handleApiRequest(req, res)
})

server.listen(PORT, () => {
  console.log(`[Database Server] Simulated JSON Database API running on http://localhost:${PORT}`)
})

