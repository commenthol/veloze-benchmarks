import * as http from 'http'
import { Router } from 'veloze/src/Router.js'
import { jsonSchema, json } from './support/index.js'

const router = new Router()

router.get('/', (req, res) => {
  jsonSchema(res, { hello: 'world' })
})
router.post('/', (req, res) => {
  json(res, { created: true }, 201)
})
router.get('/:hello', (req, res) => {
  const { hello } = req.params
  jsonSchema(res, { hello })
})
router.put('/*', (req, res) => {
  const status = 405
  json(res, { status }, status)
})

const server = http.createServer(router.handle)
server.listen(3000)
