import { AuthenticationError } from 'apollo-server-express'
import { User } from './models'
import { SESS_NAME } from './config'

const signIn = req => req.session.userId

export const checkSignIn = req => {
  if (!signIn(req)) {
    throw new AuthenticationError('You must be signed in.')
  }
}

export const checkSignOut = req => {
  if (signIn(req)) {
    throw new AuthenticationError('You already signed in.')
  }
}

export const attemptToSignIn = async (email, password) => {
  const message = 'Incorrect Email or Password. Please try again'

  const user = await User.findOne({ email })
  if (!user) {
    throw new AuthenticationError(message)
  }

  const isPasswaodMatches = await user.matchesPassword(password)
  if (!isPasswaodMatches) {
    throw new AuthenticationError(message)
  }

  return user
}

export const attemptToSignOut = (req, res) =>
  new Promise((resolve, reject) => {
    // clear cookie from req
    req.session.destroy(err => {
      if (err) reject(err)
      // also clear cookie from sending to user
      res.clearCookie(SESS_NAME)

      resolve(true)
    })
  })
