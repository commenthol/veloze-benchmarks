import connect from 'connect'
import routerF from 'router'

const router = routerF()
const app = connect()
router.get('/', function (req, res) {
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({ hello: 'world' }))
})

app.use(router)
app.listen(3000)
