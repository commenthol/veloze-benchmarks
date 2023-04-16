import polka from 'polka'
import { json } from './support/json.js'

const app = polka()

app.get('/', (req, res) => {
  json(res, { hello: 'world' })
})
app.post('/', (req, res) => {
  json(res, { created: true }, 201)
})
app.get('/:hello', (req, res) => {
  const { hello } = req.params
  json(res, { hello })
})
app.put('/*', (req, res) => {
  const status = 405
  json(res, { status }, status)
})

app.listen(3000)
