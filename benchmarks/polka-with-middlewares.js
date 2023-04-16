import polka from 'polka'
import { middlewares } from './support/middlewares.js'
import { json } from './support/json.js'

const app = polka()

app.use(...middlewares)

app.get('/', function (req, res) {
  json(res, { hello: 'world' })
})

app.listen(3000)
