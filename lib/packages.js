'use strict'

import { createRequire } from 'module'
import path from 'path'

const require = createRequire(import.meta.url)
const pkgJson = require('../package.json')

const packages = {
  '0http': { hasRouter: true, package: '0http' },
  bare: { version: '10.13.0' },
  connect: {},
  'connect-router': { extra: true, package: 'router', hasRouter: true },
  express: { hasRouter: true },
  'express-with-middlewares': { extra: true, package: 'express', hasRouter: true },
  'express-router': { extra: true, package: 'express', hasRouter: true },
  fastify: { checked: false, hasRouter: true },
  'fastify-big-json': { extra: true, package: 'fastify', hasRouter: true },
  foxify: { hasRouter: true },
  galatajs: { hasRouter: true, package: '@galatajs/app' },
  'h3-router': { hasRouter: true, package: 'h3' },
  hapi: { hasRouter: true, package: '@hapi/hapi' },
  polka: { hasRouter: true },
  'polka-with-middlewares': { extra: true, hasRouter: true, package: 'polka' },
  restana: { hasRouter: true, package: 'restana' },
  'server-base-router': { hasRouter: true },
  'spirit-router': { extra: true, hasRouter: true },
  'take-five': { hasRouter: true },
  'trpc-router': { extra: true, hasRouter: true, package: '@trpc/server' },
  vapr: { hasRouter: true },
  veloze: { hasRouter: true, package: 'veloze' },
  'veloze-send': { hasRouter: true, package: 'veloze' },
  'veloze-with-middlewares': { checked: false, extra: true, package: 'veloze', hasRouter: true },
  'veloze-big-json': { extra: true, package: 'veloze', hasRouter: true },
  'yeps-router': { extra: true, package: 'yeps', hasRouter: true }
}

const _choices = []
Object.keys(packages).forEach(pkg => {
  if (!packages[pkg].version) {
    const module = pkgJson.dependencies[pkg] ? pkg : packages[pkg].package
    const version = require(path.resolve(`node_modules/${module}/package.json`)).version
    packages[pkg].version = version
  }
  _choices.push(pkg)
})

export const choices = _choices.sort()
export function list (extra = false) {
  return _choices
    .map(c => {
      return extra === !!packages[c].extra
        ? Object.assign({}, packages[c], { name: c })
        : null
    })
    .filter(c => c)
}
export function info (module) {
  return packages[module]
}
