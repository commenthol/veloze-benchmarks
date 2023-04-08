import restana from 'restana'

const app = restana()

app.get('/', (req, res) => {
  res.send({ hello: 'world' })
})

app.start(3000)
