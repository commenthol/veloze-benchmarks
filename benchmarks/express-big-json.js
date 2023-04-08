import express from 'express'
import { getJobs } from './support/bigjson.js'

const app = express()

app.disable('etag')
app.disable('x-powered-by')

app.get('/', function (req, res) {
  const jobs = getJobs()
  res.json(jobs)
})

app.listen(3000)
