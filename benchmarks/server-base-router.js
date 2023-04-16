import http from 'http'
import serverBaseRouter from 'server-base-router'
import { json } from './support/json.js'

const router = serverBaseRouter({
  '@setup' (ctx) {
    ctx.middlewareFunctions = []
  },
  '/': {
    get (req, res) {
      json(res, { hello: 'world' })
    },
    post (req, res) {
      json(res, { created: true }, 201)
    }
  },
  '/:hello': {
    get (req, res, params) {
      const { hello } = params
      json(res, { hello })
    }
  },
  '^/.*': {
    put (req, res) {
      const status = 405
      json(res, { status }, status)
    }
  }
})

const server = http.createServer(router)
server.listen(3000)
