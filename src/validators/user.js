// import Joi from 'joi'
import Joi from '@hapi/joi'

const email = Joi.string()
  .email()
  .required()
  .label('Email')

const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label('Username')

const name = Joi.string()
  .max(254)
  .required()
  .label('Name')

const password = Joi.string()
  .min(8)
  .max(50)
  .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/)
  .required()
  .label('Password')
// .error(errors => {
//   const err = new Error()
//   err.details = []
//   err.details.push({ message: 'hoooo' })
//   return err
// })

export const signUp = Joi.object({
  email,
  username,
  name,
  password,
})

export const signIn = Joi.object({
  email,
  password,
})
