import polka from 'polka'
import { json } from './support/json.js'
import { getJobs } from './support/bigjson.js'

const app = polka()

app.get('/', function (req, res) {
  const jobs = getJobs()
  json(res, jobs)
})

app.listen(3000)
