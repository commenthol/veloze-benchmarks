import { createServer } from 'http'
import { createApp, toNodeListener, eventHandler } from 'h3'

const app = createApp()
app.use('/', eventHandler(() => ({ hello: 'world' })))

createServer(toNodeListener(app)).listen(process.env.PORT || 3000)
