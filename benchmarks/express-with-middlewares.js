import express from 'express'
import { middlewares } from './support/middlewares.js'

const app = express()

app.disable('etag')
app.disable('x-powered-by')

app.use(...middlewares)

app.get('/', function (req, res) {
  res.json({ hello: 'world' })
})

app.listen(3000)
