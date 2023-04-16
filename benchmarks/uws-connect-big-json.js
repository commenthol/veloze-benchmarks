import { App } from 'uws-connect'
import { getJobs } from './support/bigjson.js'

const app = new App()

app.get('/', function (req, res) {
  const jobs = getJobs()
  res.send(jobs)
})

app.listen(3000)
