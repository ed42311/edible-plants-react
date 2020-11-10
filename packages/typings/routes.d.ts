import { Request } from 'express'

interface IPlantBody {
  commonName: string
  edible: boolean
}

interface IUserBody {
  email: string
  password: string
}

interface CustomRequest<T> extends Request {
  body: T
}

interface CustomParams<T> extends Request {
  user: T
}
