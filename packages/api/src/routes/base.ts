import { Router } from 'express'

export const baseRouter = Router()

baseRouter.get('/hello-world', (req, res) => {
  res.send('Hello world!')
})

baseRouter.post('/check-body', (req, res) => {
  res.send(req.body)
})
