import { Server, send } from 'veloze'
import { getJobs } from './support/bigjson.js'

const app = new Server({ onlyHTTP1: true, gracefulTimeout: 0 })

app.get('/', send, function (req, res) {
  const jobs = getJobs()
  res.send(jobs)
})

app.listen(3000)
