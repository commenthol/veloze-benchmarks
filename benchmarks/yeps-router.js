import http from 'http'
import App from 'yeps'
import Router from 'yeps-router'
import { json } from './support/index.js'

const app = new App()
const router = new Router()

router.get('/').then(async (ctx) => {
  ctx.res.statusCode = 200
  json(ctx.res, { hello: 'world' })
})
router.get('/:hello').then(async (ctx) => {
  const { hello } = ctx.request.params
  json(ctx.res, { hello })
})
router.post('/').then(async (ctx) => {
  json(ctx.res, { created: true }, 201)
})
router.put('/foo').then(async (ctx) => {
  const status = 405
  json(ctx.res, { status }, status)
})

app.then(router.resolve())

app.then(async (ctx) => {
  const status = 404
  json(ctx.res, { status }, status)
})

http.createServer(app.resolve()).listen(3000)
