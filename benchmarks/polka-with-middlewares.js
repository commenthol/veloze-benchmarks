import polka from 'polka'
import { middlewares } from './support/middlewares.js'

const app = polka()

app.use(...middlewares)

app.get('/', function (req, res) {
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({ hello: 'world' }))
})

app.listen(3000)
