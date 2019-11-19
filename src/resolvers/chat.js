import { ValidationError, UserInputError } from 'apollo-server-express'
// Custom modules
import { startGroupChatValidator } from '../validators'
import { User, Chat, Message } from '../models'

export default {
  Subscription: {
    chat: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe(parent, { currentUserId }, { pubsub }, info) {
        // TODO: validate chatId
        return pubsub.asyncIterator([`chat-${currentUserId}`])
      }
    }
  },
  Query: {
    async chat(parent, { chatId }, ctx, info) {
      return await Chat.findById(chatId)
    }
  },
  Mutation: {
    async startGroupChat(parent, args, { req, pubsub }, info) {
      const { userId } = req.session
      const { title, userIds } = args

      // Validate user inputs
      const { error, value } = startGroupChatValidator(userId).validate(args, { abortEarly: false })
      if (error) {
        const err = new ValidationError('StartGroupChat validation failed.')
        err.joi = error
        throw err
      }

      // Checks all given User ids exits in DB
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

      // Pubsish Chat Subscription to all the user
      userIds.forEach(chathasUserId => {
        pubsub.publish(`chat-${chathasUserId}`, {
          chat: { mutation: 'NEW_CHAT', data: chat }
        })
      })

      return chat
    },
    async deleteAGroupChat(parent, { chatId }, { pubsub }, info) {
      // TODO: need to update delete chat rule.
      // Because if one user delete his chat the other user also lost there chat too.

      // Delete the given chatGroup
      const chat = await Chat.findByIdAndDelete(chatId)
      if (!chat) {
        throw new UserInputError('Chat Id is invalid.')
      }
      chat.users.forEach(async userId => {
        // Remove the chatId form the users
        await User.findByIdAndUpdate(userId, { $pull: { chats: chatId } }, { new: true })
      })
      // Delete all the messages with same chatId
      await Message.deleteMany({ chat: chatId })

      // Pubsish Chat Subscription to all the user
      chat.users.forEach(userId => {
        pubsub.publish(`chat-${userId}`, {
          chat: { mutation: 'DELETE_CHAT', data: chat }
        })
      })

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
