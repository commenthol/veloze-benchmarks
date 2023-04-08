import http from 'http'
import vapr from 'vapr'
const app = vapr()

app.get('/', () => [
  200,
  { 'content-type': 'application/json' },
  [JSON.stringify({ hello: 'world' })]
])

http.createServer(app).listen(3000)
