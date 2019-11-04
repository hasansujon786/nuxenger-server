import mongoose, { Schema } from 'mongoose'
import User from './user'

const { ObjectId } = Schema.Types

const chatSchema = Schema(
  {
    title: String,
    users: [
      {
        type: ObjectId,
        ref: 'User'
      }
    ],
    lastMessage: {
      type: ObjectId,
      ref: 'Message'
    }
  },
  { timestamps: true }
)

chatSchema.pre('save', async function() {
  const USER_LIMIT = 5

  if (!this.title) {
    // Get the name prop with _id form DB
    const users = await User.where('_id')
      .in(this.users)
      .limit(USER_LIMIT)
      .select('name')

    // Make a string with comma & space
    let title = users.map(user => user.name).join(', ')

    users.length > USER_LIMIT ? title + '....' : ''

    this.title = title
  }
})

export default mongoose.model('Chat', chatSchema)
