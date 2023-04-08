import fastifyF from 'fastify'

const fastify = fastifyF()

const schema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: {
            type: 'string'
          }
        }
      }
    }
  }
}

fastify.get('/', schema, function (req, reply) {
  reply.send({ hello: 'world' })
})
fastify.post('/', function (req, reply) {
  reply.status(201)
  reply.send({ created: true })
})
fastify.get('/:hello', schema, function (req, reply) {
  const { hello } = req.params
  reply.send({ hello })
})
fastify.put('/*', function (req, reply) {
  const status = 405
  reply.status(status)
  reply.send({ status })
})

fastify.listen({ port: 3000, host: '127.0.0.1' })
