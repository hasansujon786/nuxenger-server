import { UserInputError, ValidationError } from 'apollo-server-express'
import { Types } from 'mongoose'
// validators
import { signUp } from '../validators'
// models
import { User } from '../models'

export default {
  Query: {
    users(parent, args, ctx, info) {
      // TODO : auth, projection, pagination, sanitization

      return User.find({})
    },
    user(parent, { id }, ctx, info) {
      // TODO : auth, projection, sanitization
      if (!Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} this is is not valid.`)
      }

      return User.findById(id)
    },
  },

  Mutation: {
    signUp: (parent, args, ctx, info) => {
      // TODO : not auth

      //  validation
      const { error, value } = signUp.validate(args, { abortEarly: false })
      if (error) {
        const err = new ValidationError('Validation failed.')
        err.joi = error
        throw err
      }

      return User.create(args)
    },
  },
}
