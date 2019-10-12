import mongoose, { Schema } from 'mongoose'
import { Chat } from './index'

const { ObjectId } = Schema.Types

const messageSchema = Schema(
  {
    body: String,
    sender: {
      type: ObjectId,
      ref: 'User'
    },
    chat: {
      type: ObjectId,
      ref: 'Chat',
      validate: {
        validator: chat => Message.chatIdExists(chat),
        message: ({ value }) => `This chat Object ID dosen't exist in DB.` // TODO: security
      }
    }
  },
  { timestamps: true }
)

// TODO: lastmessage for Chat schema

// userSchema.pre('save', async function() {
//   if (this.isModified('body')) {
//     // no need for tryCatch because of joi validation
//     const    Chat
//     this.password = await hash(this.password, 10)
//   }
// })

messageSchema.statics.chatIdExists = async function(options) {
  // Cheks given Chat ID exists in DB
  return (await Chat.findById(options).countDocuments()) !== 0
}

const Message = mongoose.model('Message', messageSchema)
export default Message
