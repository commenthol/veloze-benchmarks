import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ hello: 'world' })
})
app.post('/', (c) => {
  return c.json({ created: true }, 201)
})
app.get('/:hello', (c) => {
  const { hello } = c.req.param()
  return c.json({ hello })
})
app.put('/*', (c) => {
  const status = 405
  return c.json({ status }, status)
})

serve({ fetch: app.fetch, port: 3000 })
