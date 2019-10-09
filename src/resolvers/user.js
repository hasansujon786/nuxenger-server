import { UserInputError, ValidationError } from 'apollo-server-express'
import { Types } from 'mongoose'
// validators
import { signUpValidator, signInValidator } from '../validators'
// models
import { User } from '../models'
import * as Auth from '../auth'

export default {
  Query: {
    async me(parent, args, { req }, info) {
      Auth.checkSignIn(req)

      return await User.findById(req.session.userId)
    },
    users(parent, args, { req }, info) {
      // TODO : auth, projection, pagination, sanitization
      Auth.checkSignIn(req)
      return User.find({})
    },
    user(parent, { id }, ctx, info) {
      // TODO : auth, projection, sanitization
      if (!Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} this id is not valid.`)
      }

      return User.findById(id)
    }
  },

  Mutation: {
    async signUp(parent, args, { req }, info) {
      // if not auth
      Auth.checkSignOut(req)

      //  validation
      const { error, value } = await signUpValidator.validate(args, { abortEarly: false })
      if (error) {
        const err = new ValidationError('Signup validation failed.')
        err.joi = error
        throw err
      }

      return User.create(args)
    },
    async signIn(parent, args, { req }, info) {
      const { userId } = req.session
      // if user already signedIn
      if (userId) {
        return User.findById(userId)
      }

      // validate
      const { error, value } = await signInValidator.validate(args, { abortEarly: false })
      if (error) {
        const err = new ValidationError('SignIn validation failed.')
        err.joi = error
        throw err
      }

      // get user
      const user = await Auth.attemptToSignIn(args.email, args.password)

      // settting userId on session Obj
      req.session.userId = user.id

      return user
    },
    signOut(parent, args, { req, res }, info) {
      Auth.checkSignIn(req)

      return Auth.attemptToSignOut(req, res)
    }
  }
}
