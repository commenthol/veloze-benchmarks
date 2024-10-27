import { describe, it, before, after } from 'node:test'
import supertest from 'supertest'
import { fork } from 'child_process'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { mdTable } from '../lib/mdTable.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const nap = (ms = 20) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(ms)
    }, ms)
  )

const get = (url) =>
  supertest(url).get('/').expect(200).expect({ hello: 'world' })

const getParam = (url) =>
  supertest(url).get('/kitty').expect(200).expect({ hello: 'kitty' })
// .then(({ body, status }) => console.log(body, status))

const post = (url) =>
  supertest(url)
    .post('/')
    .type('json')
    .send({ hello: 'new' })
    .expect(201)
    .expect({ created: true })
// .then(({ body, status }) => console.log(body, status))

const notFound = (url) => supertest(url).get('/foo/bar').expect(404)
// .then(({ body, status }) => console.log(body, status))

const update = (url) => supertest(url).put('/foo').expect(405)

const startupTimes = {}

const startup = async (url, handler) => {
  const start = process.hrtime.bigint()
  const end = Date.now() + 500
  while (Date.now() < end) {
    const res = await supertest(url)
      .get('/')
      .catch(() => {})
    if (res !== undefined) {
      break
    }
    await nap(0)
  }
  const stop = process.hrtime.bigint() - start
  const ms = (Number(stop) * 10e-7).toFixed(0)
  startupTimes[handler] = ms
  console.log('startup: %s: %s', handler, ms)
}

const packages = [
  'bare',
  '0http',
  'connect-router',
  'express-router',
  'express',
  'fastify',
  'foxify',
  'h3-router',
  'hapi',
  'polka',
  'restana',
  'restify',
  'server-base-router',
  'take-five',
  'uws-connect',
  'veloze',
  'veloze-router',
  'yeps-router'
]

const url = 'http://127.0.0.1:3000'

describe('test', function () {
  after(() => {
    const sortedTimes = Object.entries(startupTimes)
      .sort((a, b) => a[1] - b[1])
      .map(([k, v]) => [v, k])
    const table = [['Startup (ms)', ''], ['--:', '---'], ...sortedTimes]
    console.log(mdTable(table))
  })

  for (const handler of packages) {
    describe(handler, async () => {
      let forked
      before(async () => {
        forked = fork(join(__dirname, '..', 'benchmarks', handler + '.js'))
        await startup(url, handler)
      })
      after(async () => {
        forked.kill('SIGINT')
        await nap(20)
      })

      it('get', async () => {
        await get(url)
      })
      it('getParam', async () => {
        await getParam(url)
      })
      it('post', async () => {
        await post(url)
      })
      it('update', async () => {
        await update(url)
      })
      it('notFound', async () => {
        await notFound(url)
      })
    })
  }
})
