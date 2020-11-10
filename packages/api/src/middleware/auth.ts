import { verify, VerifyErrors } from 'jsonwebtoken'
import { User } from '../models'
import config from '../config'
import { ExpressTypesWithNext, CustomParams, IUser } from 'typings'

export const auth = (
  req: CustomParams<IUser>,
  res: ExpressTypesWithNext['response'],
  next: ExpressTypesWithNext['next']
): void => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1]

  // decode the token using a secret key-phrase
  return verify(
    token,
    config.jwtSecret,
    (err: VerifyErrors, decoded: { sub: string }) => {
      // the 401 code is for unauthorized status
      if (err) {
        return res.status(401).end()
      }

      const userId: string = decoded.sub

      // check if a user exists
      return User.findById(userId, (userErr, user) => {
        if (userErr || !user) {
          return res.status(401).end()
        }
        // pass user details onto next route
        req.user = user
        return next()
      })
    }
  )
}
