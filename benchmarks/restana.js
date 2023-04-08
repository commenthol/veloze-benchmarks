import restana from 'restana'

const app = restana()

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

app.start(3000)
