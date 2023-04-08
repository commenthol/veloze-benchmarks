import { Server, response } from 'veloze'

const { send } = response

const app = new Server({ onlyHTTP1: true, gracefulTimeout: 0 })

app.get('/', function (req, res) {
  send(res, { hello: 'world' })
})

app.listen(3000)
