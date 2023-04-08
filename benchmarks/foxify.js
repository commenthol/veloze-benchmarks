import Foxify from 'foxify'

const app = new Foxify()

app.disable('x-powered-by')

app.set('url', '127.0.0.1')
  .set('port', 3000)
  .set('workers', 1)

const schema = {
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

app.get('/', schema, (req, res) => {
  res.json({ hello: 'world' })
})
app.post('/', (req, res) => {
  res.status(201).json({ created: true })
})
app.get('/:hello', schema, (req, res) => {
  const { hello } = req.params
  res.json({ hello })
})
// no support for wildcard routes!
app.put('/foo', async (req, res) => {
  const status = 405
  res.status(status).json({ status })
})

app.start()
