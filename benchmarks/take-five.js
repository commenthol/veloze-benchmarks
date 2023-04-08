import Five from 'take-five'

const server = new Five()

server.get('/', function (req, res, ctx) {
  return ctx.send({ hello: 'world' })
})
server.post('/', (req, res, ctx) => {
  ctx.send(201, { created: true })
})
server.get('/:hello', (req, res, ctx) => {
  const { hello } = ctx.params
  if (hello === '_') {
    ctx.err(404)
    return
  }
  ctx.send({ hello })
})
server.put('/*', async (req, res, ctx) => {
  ctx.err(405)
})

server.listen(3000)
