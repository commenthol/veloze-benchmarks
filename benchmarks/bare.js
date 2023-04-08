import * as http from 'http'
import { jsonSchema, json } from './support/index.js'

const app = (req, res) => {
  const { method, url } = req
  // const [path] = url.split('?') // -3000rps
  const path = url

  if (method === 'GET') {
    if (path === '/') {
      jsonSchema(res, { hello: 'world' })
      return
    } else {
      // eslint-disable-next-line no-unused-vars
      const [_, hello, other] = path.split('/')
      if (hello && !other) {
        jsonSchema(res, { hello })
        return
      }
    }
  } else if (method === 'POST') {
    if (path === '/') {
      json(res, { created: true }, 201)
      return
    }
  } else {
    const status = 405
    json(res, { status }, status)
    return
  }
  const status = 404
  json(res, { status }, status)
}

const server = http.createServer(app)
server.listen(3000)
