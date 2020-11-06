import { Request, Response, NextFunction } from 'express'

export const loggerMiddleware: (
  request: Request,
  response: Response,
  next: NextFunction
) => void = (request, _response, next) => {
  console.log(`${request.method} ${request.path}`)
  next()
}
