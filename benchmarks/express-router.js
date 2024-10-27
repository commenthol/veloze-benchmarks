import http from 'http'
import { Router } from 'express'
import { json } from './support/json.js'

const router = new Router()

router.get('/', (req, res) => {
  json(res, { hello: 'world' })
})
router.post('/', (req, res) => {
  json(res, { created: true }, 201)
})
router.get('/:hello', (req, res) => {
  const { hello } = req.params
  json(res, { hello })
})
router.put('/*wc', (req, res) => {
  const status = 405
  json(res, { status }, status)
})

const app = (req, res) =>
  router(req, res, (err) => {
    const status = err ? 500 : 404
    json(res, { status }, status)
  })

const server = http.createServer(app)
server.listen(3000)
