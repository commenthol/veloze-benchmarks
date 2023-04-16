import * as http from 'http'
import { json } from './support/json.js'

const app = (req, res) => {
  const { method, url } = req
  // const [path] = url.split('?') // -3000rps
  const path = url

  if (method === 'GET') {
    if (path === '/') {
      json(res, { hello: 'world' })
      return
    } else {
      // eslint-disable-next-line no-unused-vars
      const [_, hello, other] = path.split('/')
      if (hello && !other) {
        json(res, { hello })
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
