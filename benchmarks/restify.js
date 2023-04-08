import restify from 'restify'

const server = restify.createServer()

server.get('/', function (req, res, next) {
  res.send({ hello: 'world' })
  return next()
})
server.post('/', (req, res, next) => {
  res.status(201)
  res.send({ created: true })
  return next()
})
server.get('/:hello', (req, res, next) => {
  const { hello } = req.params
  res.send({ hello })
  return next()
})
// no support for wildcard routes!
server.put('/foo', (req, res, next) => {
  const status = 405
  res.status(status)
  res.send({ status }, status)
  return next()
})

server.listen(3000, function () {})
