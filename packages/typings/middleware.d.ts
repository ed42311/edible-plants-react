import { Request, Response, NextFunction } from 'express'

interface ExpressTypesWithNext {
  request: Request
  response: Response
  next: NextFunction
}
