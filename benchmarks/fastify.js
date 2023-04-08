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

fastify.listen({ port: 3000, host: '127.0.0.1' })