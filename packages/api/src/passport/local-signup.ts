import { User } from '../models'
import { Strategy as LocalSignupStrategy } from 'passport-local'
import { Types } from 'mongoose'

export const localSignupStrategy = new LocalSignupStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    const userData = {
      _id: Types.ObjectId(),
      email: email.trim(),
      password: password.trim(),
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
    }

    const newUser = new User(userData)
    newUser.save((err) => {
      if (err) {
        return done(err)
      }

      return done(null)
    })
  }
)
