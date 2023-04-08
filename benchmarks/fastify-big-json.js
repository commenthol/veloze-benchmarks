import fastifyF from 'fastify'
import { getJobs } from './support/bigjson.js'

const fastify = fastifyF()

const opts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            employer: { type: 'string' }
          }
        }
      }
    }
  }
}

fastify.get('/', opts, function (request, reply) {
  const jobs = getJobs(200)
  reply.send(jobs)
})

fastify.listen({ port: 3000, host: '127.0.0.1' })
