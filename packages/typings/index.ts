import { Request, Response, NextFunction } from 'express'

type ModuleId = string | number

export interface WebpackHotModule {
  hot?: {
    data: any
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void
    accept(dependency: string, callback?: () => void): void
    accept(errHandler?: (err: Error) => void): void
    dispose(callback: (data: any) => void): void
  }
}

export interface ILogger {
  request: Request
  response: Response
  next: NextFunction
}
