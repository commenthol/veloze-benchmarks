import { App } from 'uws-connect'
import { middlewares } from './support/middlewares.js'

const app = new App()

app.get('/', ...middlewares, function (req, res) {
  res.send({ hello: 'world' })
})

app.listen(3000)
