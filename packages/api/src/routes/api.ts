import { Router, Response } from 'express'
import { CustomParams, IUser } from 'typings'

export const apiRouter = Router()

apiRouter.get('/dashboard', (req: CustomParams<IUser>, res: Response) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    user: req.user,
  })
})
