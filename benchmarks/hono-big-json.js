import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { getJobs } from './support/bigjson.js'

const app = new Hono()

app.get('/', (c) => {
  const jobs = getJobs()
  return c.json(jobs)
})

serve({ fetch: app.fetch, port: 3000 })
