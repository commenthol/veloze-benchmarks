import Five from 'take-five'

const server = new Five()

server.get('/', function (req, res, ctx) {
  return ctx.send({ hello: 'world' })
})

server.listen(3000)
