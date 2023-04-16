import cero from '0http'
import { json } from './support/json.js'

const { router, server } = cero()

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
router.put('/*', (req, res) => {
  const status = 405
  json(res, { status }, status)
})

server.listen(3000)
