import { createServer } from 'http'
import { createApp, toNodeListener, eventHandler, createRouter } from 'h3'

const router = createRouter()

router.get('/', eventHandler(() => ({ hello: 'world' })))
router.post('/', eventHandler((event) => {
  event.node.res.statusCode = 201
  return { created: true }
}))
router.get('/:hello', eventHandler((event) => {
  const { hello } = event.context.params
  return { hello }
}))
// strange behavior for .put('/*') as .get('/:hello') will also return 405 error!
router.put('/foo', eventHandler((event) => {
  const status = 405
  event.node.res.statusCode = status
  return { status }
}))

const app = createApp()
app.use(router)

createServer(toNodeListener(app)).listen(3000)
