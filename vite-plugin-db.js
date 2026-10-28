import { handleApiRequest } from './server/dbHandler.js'

export function jsonDbPlugin() {
  return {
    name: 'vite-plugin-json-db',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          await handleApiRequest(req, res, next)
        } else {
          next()
        }
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && (req.url.startsWith('/storeapi') || req.url.startsWith('/api'))) {
          await handleApiRequest(req, res, next)
        } else {
          next()
        }
      })
    },
  }
}

