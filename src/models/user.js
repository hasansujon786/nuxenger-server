import mongoose, { Schema, model } from 'mongoose'
import { hash, compare } from 'bcryptjs'

const userSchema = Schema(
  {
    email: {
      type: String,
      validate: {
        validator: email => User.dosentExist({ email }),
        message: ({ value }) => `${value} has already been taken.` // TODO: security
      }
    },
    username: {
      type: String,
      validate: {
        validator: username => User.dosentExist({ username }),
        message: ({ value }) => `${value} has already been taken.` // TODO: security
      }
    },
    name: String,
    password: String
  },
  { timestamps: true }
)

userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    // no need for tryCatch because of joi validation
    this.password = await hash(this.password, 10)
  }
})

userSchema.statics.dosentExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0
}

userSchema.methods.matchesPassword = async function(password) {
  return await compare(password, this.password)
}

const User = model('User', userSchema)
export default User
