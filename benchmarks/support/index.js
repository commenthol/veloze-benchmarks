import fastJson from 'fast-json-stringify'

const schema = {
  type: 'object',
  properties: {
    hello: {
      type: 'string'
    }
  }
}
const stringify = fastJson(schema)

export const jsonSchema = (res, body, status) => {
  if (status) res.statusCode = status
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.end(stringify(body))
}

export const json = (res, body, status) => {
  if (status) res.statusCode = status
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}
