import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'

const dnsPrefetchControl = () => (c, next) => {
  c.res.headers.set('X-DNS-Prefetch-Control', 'off')
  next()
}

const app = new Hono()

app.use(
  '*',
  cors(),
  secureHeaders({
    contentSecurityPolicyReportOnly: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
    xPermittedCrossDomainPolicies: false,
    xDownloadOptions: false,
    originAgentCluster: false,
    referrerPolicy: false,
    strictTransportSecurity: 'max-age=63072000; includeSubDomains; preload',
    xFrameOptions: 'SAMEORIGIN',
    xXssProtection: '0'
  }),
  dnsPrefetchControl()
)

app.get('/', (c) => {
  return c.json({ hello: 'world' })
})

serve({ fetch: app.fetch, port: 3000 })
