import cors from 'cors'
import dnsPrefetchControl from 'dns-prefetch-control'
import frameGuard from 'frameguard'
import hsts from 'hsts'
import hidePoweredBy from 'hide-powered-by'
import xXssProtection from 'x-xss-protection'

export const middlewares = [
  cors(),
  dnsPrefetchControl(),
  frameGuard(),
  hidePoweredBy(),
  hsts(),
  xXssProtection()
]
