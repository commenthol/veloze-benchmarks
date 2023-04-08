import { createServer } from 'http'
import { createApp, toNodeListener, eventHandler, createRouter } from 'h3'

const app = createApp()

const router = createRouter()
  .get('/', eventHandler(() => ({ hello: 'world' })))

app.use(router)

createServer(toNodeListener(app)).listen(process.env.PORT || 3000)
