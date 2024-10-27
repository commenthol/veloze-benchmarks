import { createRequire } from 'module'
import path from 'path'

const require = createRequire(import.meta.url)
const pkgJson = require('../package.json')

const packages = {
  '0http': { hasRouter: true, package: '0http' },
  bare: { version: process.version.slice(1), checked: false },
  'connect-router': { extra: true, package: 'router', hasRouter: true },
  express: { hasRouter: true },
  'express-router': { extra: true, package: 'express', hasRouter: true },
  'express-big-json': { extra: true, package: 'express', hasRouter: true },
  'express-with-middlewares': {
    extra: true,
    package: 'express',
    hasRouter: true
  },
  fastify: { hasRouter: true, checked: false },
  'fastify-big-json': { extra: true, package: 'fastify', hasRouter: true },
  'fastify-with-middlewares': {
    extra: true,
    package: 'fastify',
    hasRouter: true
  },
  foxify: { hasRouter: true },
  'h3-router': { hasRouter: true, package: 'h3' },
  hapi: { hasRouter: true, package: '@hapi/hapi' },
  polka: { hasRouter: true, checked: false },
  'polka-big-json': { extra: true, hasRouter: true, package: 'polka' },
  'polka-with-middlewares': { extra: true, hasRouter: true, package: 'polka' },
  restana: { hasRouter: true, package: 'restana' },
  restify: { hasRouter: true, package: 'restify' },
  'server-base-router': { hasRouter: true },
  'take-five': { hasRouter: true },
  'uws-connect': { hasRouter: true, package: 'uws-connect', checked: false },
  'uws-connect-big-json': {
    extra: true,
    hasRouter: true,
    package: 'uws-connect',
    checked: false
  },
  'uws-connect-with-middlewares': {
    extra: true,
    package: 'uws-connect',
    checked: false,
    hasRouter: true
  },
  veloze: { hasRouter: true, package: 'veloze', checked: false },
  'veloze-router': { hasRouter: true, package: 'veloze', checked: false },
  'veloze-big-json': { extra: true, package: 'veloze', hasRouter: true },
  'veloze-with-middlewares': {
    extra: true,
    package: 'veloze',
    checked: false,
    hasRouter: true
  },
  'yeps-router': { package: 'yeps', hasRouter: true }
  // 'spirit-router': { extra: true, hasRouter: true }, // ISSUE: too complicated to return a simple status code
  // vapr: { hasRouter: true }, // ISSUE: routing does not work
}

const _choices = []
Object.keys(packages).forEach((pkg) => {
  if (!packages[pkg].version) {
    const module = pkgJson.dependencies[pkg] ? pkg : packages[pkg].package
    const version = require(
      path.resolve(`node_modules/${module}/package.json`)
    ).version
    packages[pkg].version = version
  }
  _choices.push(pkg)
})

export const choices = _choices.sort()
export function list(extra = false) {
  return _choices
    .map((c) => {
      return extra === !!packages[c].extra
        ? Object.assign({}, packages[c], { name: c })
        : null
    })
    .filter((c) => c)
}
export function info(module) {
  return packages[module]
}
