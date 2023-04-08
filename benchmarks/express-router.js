import http from 'http'
import { Router } from 'express'

const app = new Router()

app.get('/', function (req, res) {
  res.setHeader('content-type', 'application/json')
  res.end(JSON.stringify({ hello: 'world' }))
})

http.createServer(app).listen(3000)
