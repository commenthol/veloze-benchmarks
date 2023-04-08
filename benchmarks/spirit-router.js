import http from 'http'
import spirit from 'spirit'
import route from 'spirit-router'

const { adapter } = spirit.node

const hello = () => {
  return { hello: 'world' }
}

const app = route.define([
  route.get('/', hello)
])

http.createServer(adapter(app)).listen(3000)
