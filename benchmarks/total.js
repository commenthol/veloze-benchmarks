import total from 'total.js'

total.http('release', {
  ip: '127.0.0.1',
  port: 3000
})
total.route('/', function () {
  this.json({ hello: 'world' })
})
total.route('/{hello}', function (...params) {
  const [hello] = params
  this.json({ hello })
})
total.route('POST /', function () {
  this.status = 201
  this.json({ created: true })
})
total.route('PUT /*', function () {
  this.status = 405
  this.json({ status: 405 })
})
