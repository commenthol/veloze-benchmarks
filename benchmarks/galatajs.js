import { createApp } from '@galatajs/app'
import { createHttpServer, createRouter } from '@galatajs/http'

const app = createApp()
const server = createHttpServer()
app.register(server)
server.config.host = 'localhost'
createRouter({ prefix: '' }).get('', (req, res) => {
  res.send({
    hello: 'world'
  })
})
app.start()
