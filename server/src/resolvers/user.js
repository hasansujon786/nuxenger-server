import { UserInputError, ValidationError } from 'apollo-server-express'
import { Types } from 'mongoose'
// Moudles
import { User } from '../models'
import { attemptToSignIn, attemptToSignOut } from '../auth'
import { signUpValidator, signInValidator } from '../validators'

export default {
  Query: {
    async me(parent, args, { req }, info) {
      // TODO : projection, sanitization
      if (req.session.userId) {
        return await User.findById(req.session.userId)
      }
      return null
    },
    async users(parent, args, { req }, info) {
      // TODO : projection, pagination, sanitization

      return await User.find({})
    },
    async user(parent, { id }, ctx, info) {
      // TODO : projection, sanitization

      if (!Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} this id is not valid.`)
      }

      return await User.findById(id)
    },
    hello(parent, args, ctx, info) {
      return 'hello world'
    }
  },

  Mutation: {
    async signUp(parent, args, { req }, info) {
      // Validate user inputs
      const { error, value } = signUpValidator.validate(args, { abortEarly: false })
      if (error) {
        const err = new ValidationError('Signup validation failed.')
        err.joi = error
        throw err
      }

      // Create & save user to database
      return await User.create(args)
    },
    async signIn(parent, args, { req, res }, info) {
      // res.cookie('token', 'hudaibujlamama', {
      //   httpOnly: true,
      //   secure: false,
      //   maxAge: 1000 * 60 * 60 * 24 * 31
      // })
      // console.log('res from sign in', res)

      // console.log('res from sign in')
      // Validate user inputs
      const { error, value } = signInValidator.validate(args, { abortEarly: false })
      if (error) {
        const err = new ValidationError('SignIn validation failed.')
        err.joi = error
        throw err
      }

      // Find user from geiven inputs
      const user = await attemptToSignIn(args.email, args.password)

      // Settting userId on session Obj
      req.session.userId = user.id

      return user
    },
    async signOut(parent, args, { req, res }, info) {
      // Return true/false
      // if everything ok return true
      return await attemptToSignOut(req, res)
    }
  },
  User: {
    async chats(user, args, ctx, info) {
      return (await user.populate('chats').execPopulate()).chats
    }
  }
}
