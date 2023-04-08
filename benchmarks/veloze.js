import { Server } from 'veloze'

const app = new Server({ onlyHTTP1: true, gracefulTimeout: 0 })

app.get('/', function (req, res) {
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({ hello: 'world' }))
})

app.listen(3000)
