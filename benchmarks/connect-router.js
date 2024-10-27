import connect from 'connect'
import routerF from 'router'
import { json } from './support/json.js'

const router = routerF()
const app = connect()

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

app.use(router)
app.listen(3000)
