import { App, params } from 'uws-connect'

const app = new App()

app.get('/', (req, res) => {
  res.send({ hello: 'world' })
})
app.post('/', (req, res) => {
  res.send({ created: true }, 201)
})
app.get('/:hello', params('/:hello'), (req, res) => {
  const { hello } = req.params
  res.send({ hello })
})
app.put('/*', (req, res) => {
  const status = 405
  res.send({ status }, status)
})
app.any('/*', (req, res) => {
  const status = 404
  res.send({ status }, status)
})

app.listen(3000)
