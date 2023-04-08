import http from 'http'
import serverBaseRouter from 'server-base-router'

http.createServer(
  serverBaseRouter({
    '@setup' (ctx) {
      ctx.middlewareFunctions = []
    },
    '/': {
      get (req, res) {
        res.setHeader('content-type', 'application/json; charset=utf-8')
        res.json({ hello: 'world' })
      }
    }
  })
)
  .listen(3000)
