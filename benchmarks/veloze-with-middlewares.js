import { Server } from 'veloze'
import { middlewares } from './support/middlewares.js'
import { json } from './support/json.js'

const app = new Server({ onlyHTTP1: true, gracefulTimeout: 0 })

app.use(...middlewares)

app.get('/', function (req, res) {
  json(res, { hello: 'world' })
})

app.listen(3000)
