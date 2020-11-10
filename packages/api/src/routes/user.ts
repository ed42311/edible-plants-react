import { Router } from 'express'

export const userRouter = Router()

// Models
import { User } from '../models'

// Types
import { IUserBody, CustomRequest } from 'typings'

userRouter
  .route('/users')
  .get(async (_req, res) => {
    try {
      res.json(await User.find({}))
    } catch (err) {
      res.status(500).send(err)
    }
  })
  .post(async (req: CustomRequest<IUserBody>, res) => {
    try {
      // Validators
      const newUser = new User(req.body)
      const savedUser = await newUser.save()
      res.json(savedUser)
    } catch (err) {
      res.status(500).send(err)
    }
  })

userRouter
  .route('/user/:user_id')
  .get(async (req: CustomRequest<IUserBody>, res) => {
    try {
      // Validators
      const foundUser = await User.findById(req.params.user_id)
      res.json(foundUser)
    } catch (err) {
      res.status(500).send(err)
    }
  })
  .put(async (req, res) => {
    try {
      const foundUser = await User.findById(req.params.user_id)
      foundUser.email = req.body.email
      foundUser.password = req.body.password
      const savedUser = await foundUser.save()
      res.json(savedUser)
    } catch (err) {
      res.status(500).send(err)
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedUser = await User.findOneAndDelete({
        _id: req.params.user_id,
      })
      res.json(deletedUser)
    } catch (err) {
      res.status(500).send(err)
    }
  })
