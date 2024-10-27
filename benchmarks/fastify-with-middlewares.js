import fastifyF from 'fastify'
import fExpress from '@fastify/express'
import cors from 'cors'
import dnsPrefetchControl from 'dns-prefetch-control'
import frameGuard from 'frameguard'
import hsts from 'hsts'
import hidePoweredBy from 'hide-powered-by'
import xXssProtection from 'x-xss-protection'

const fastify = fastifyF()
await fastify.register(fExpress)
fastify.use(cors())
fastify.use(dnsPrefetchControl())
fastify.use(frameGuard())
fastify.use(hsts())
fastify.use(hidePoweredBy())
fastify.use(xXssProtection())

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
