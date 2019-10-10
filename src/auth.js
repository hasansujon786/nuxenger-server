import { AuthenticationError } from 'apollo-server-express'
import { User } from './models'
import { SESS_NAME } from './config'

const signIn = req => req.session.userId

export const ensureSignIn = req => {
  if (!signIn(req)) {
    throw new AuthenticationError('You must be signed in.')
  }
}

export const ensureSignOut = req => {
  if (signIn(req)) {
    throw new AuthenticationError('You already signed in.')
  }
}

export const attemptToSignIn = async (email, password) => {
  const message = 'Incorrect Email or Password. Please try again'

  // Find user by email
  const user = await User.findOne({ email })
  if (!user) {
    throw new AuthenticationError(message)
  }

  // Checks given password is matched
  const isPasswaodMatches = await user.matchesPassword(password)
  if (!isPasswaodMatches) {
    throw new AuthenticationError(message)
  }

  return user
}

export const attemptToSignOut = (req, res) =>
  new Promise((resolve, reject) => {
    // Clear cookie from req
    req.session.destroy(err => {
      // Retur if any err
      if (err) reject(err)

      // Also clear cookie from sending to user
      res.clearCookie(SESS_NAME)

      // if everything ok return true
      resolve(true)
    })
  })
