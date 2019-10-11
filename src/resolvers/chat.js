import { ValidationError, UserInputError } from 'apollo-server-express'
// Custom modules
import { startChatValidator } from '../validators'
import { User, Chat, Message } from '../models'

export default {
  Query: {},
  Mutation: {
    async startChat(parent, args, { req }, info) {
      const { userId } = req.session
      const { title, userIds } = args

      // Validate user inputs
      const { error, value } = startChatValidator(userId).validate(args, { abortEarly: false })
      if (error) {
        const err = new ValidationError('StartChat validation failed.')
        err.joi = error
        throw err
      }

      // Checks all given ids exits in DB
      const idsFound = await User.where('_id')
        .in(userIds)
        .countDocuments()
      if (idsFound !== userIds.length) {
        throw new UserInputError('One or many User Ids are invalid.')
      }

      // Push current user to users arr
      userIds.push(userId)
      // Create new Chat
      const chat = await Chat.create({ title, users: userIds })
      // Updat Users
      await User.updateMany({ _id: { $in: userIds } }, { $push: { chats: chat } })

      return chat
    }
  },
  Chat: {
    async users(parent, args, ctx, info) {
      return (await parent.populate('users').execPopulate()).users
    },
    async messages(parent, args, ctx, info) {
      // TODO : Pagination, projection
      return await Message.find({ chat: parent.id })
    },
    async lastMessage(parent, args, ctx, info) {
      return (await parent.populate('lastMessage').execPopulate()).lastMessage
    }
  }
}
