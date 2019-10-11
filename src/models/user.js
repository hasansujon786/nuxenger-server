import mongoose, { Schema } from 'mongoose'
import { hash, compare } from 'bcryptjs'

const userSchema = Schema(
  {
    email: {
      type: String,
      validate: {
        validator: email => User.dosentExist({ email }),
        message: ({ value }) => `This email has already been taken.` // TODO: security
      }
    },
    username: {
      type: String,
      validate: {
        validator: username => User.dosentExist({ username }),
        message: ({ value }) => `This username has already been taken.` // TODO: security
      }
    },
    name: String,
    password: String,
    chats: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
      }
    ]
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
  // this will run from User Object
  return (await this.where(options).countDocuments()) === 0
}

userSchema.methods.matchesPassword = async function(password) {
  // this will run from user Object
  return await compare(password, this.password)
}

// this is needed
const User = mongoose.model('User', userSchema)
export default User
