import express from 'express'

const app = express()

app.disable('etag')
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ hello: 'world' })
})
app.post('/', (req, res) => {
  res.status(201).json({ created: true })
})
app.get('/:hello', (req, res) => {
  const { hello } = req.params
  res.json({ hello })
})
app.put('/*wc', (req, res) => {
  const status = 405
  res.status(status).json({ status })
})

app.listen(3000)
