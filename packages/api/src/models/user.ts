import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

import { IUser, IUserModel } from 'typings'

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.methods.validatePassword = async function (pass: string) {
  return bcrypt.compare(pass, this.password)
}

/**
 * The pre-save hook method.
 */
userSchema.pre('save', function (this: IUser, next) {
  // proceed further only if the password is modified or the user is new
  if (!this.isModified('password')) return next()

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return next(saltError)
    }

    return bcrypt.hash(this.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError)
      }

      // replace a password string with hash value
      this.password = hash

      return next()
    })
  })
})

export const User: IUserModel = model<IUser, IUserModel>('User', userSchema)
