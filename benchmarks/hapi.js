import 'make-promises-safe'
import Hapi from '@hapi/hapi'

async function start () {
  const server = Hapi.server({ port: 3000, debug: false })

  server.route({
    method: 'GET',
    path: '/',
    config: {
      cache: false,
      response: {
        ranges: false
      },
      state: { parse: false }
    },
    handler: function (request, h) {
      return { hello: 'world' }
    }
  })
  server.route({
    method: 'POST',
    path: '/',
    handler: function (request, h) {
      return h.response({ created: true }).code(201)
    }
  })
  server.route({
    method: 'GET',
    path: '/{hello}',
    handler: function (request, h) {
      const { hello } = request.params
      return { hello }
    }
  })
  server.route({
    method: 'PUT',
    path: '/foo', // wildcards not supported!
    handler: function (request, h) {
      const status = 405
      return h.response({ status }).code(status)
    }
  })

  await server.start()
}

start()
