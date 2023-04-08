import { Server, send } from 'veloze'

const app = new Server({ onlyHTTP1: true, gracefulTimeout: 0 })

app.use(send)
app.get('/', (req, res) => {
  res.send({ hello: 'world' })
})
app.post('/', (req, res) => {
  res.send({ created: true }, 201)
})
app.get('/:hello', (req, res) => {
  const { hello } = req.params
  res.send({ hello })
})
app.put('/*', (req, res) => {
  const status = 405
  res.send({ status }, status)
})

app.listen(3000)
