import { ExpressTypesWithNext } from 'typings'

export const loggerMiddleware = (
  request: ExpressTypesWithNext['request'],
  _response: ExpressTypesWithNext['response'],
  next: ExpressTypesWithNext['next']
): void => {
  console.log(`${request.method} ${request.path}`)
  next()
}
