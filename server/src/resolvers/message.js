import { ValidationError, UserInputError } from 'apollo-server-express'
// Custom modules
import { sendMessageValidator } from '../validators'
import { Message, User, Chat } from '../models'

export default {
  Subscription: {
    message: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe(parent, { chatId }, { pubsub }, info) {
        // TODO: validate chatId
        return pubsub.asyncIterator([`message-${chatId}`])
      }
    }
  },
  Query: {},
  Mutation: {
    async sendMessage(parent, args, { req, pubsub }, info) {
      // Validate user inputs
      const { error, value } = sendMessageValidator.validate(args, { abortEarly: false })
      if (error) {
        const err = new ValidationError('StartGroupChat validation failed.')
        err.joi = error
        throw err
      }
      // Values
      const { body, chatId } = value
      const { userId } = req.session
      const message = await Message.create({ body, chat: chatId, sender: userId })
      pubsub.publish(`message-${chatId}`, { message: { mutation: 'NEW_MESSAGE', data: message } })
      return message
    }
  },
  Message: {
    async sender(parent, args, ctx, info) {
      return (await parent.populate('sender').execPopulate()).sender
    },
    async chat(parent, args, ctx, info) {
      return (await parent.populate('chat').execPopulate()).chat
    }
  }
}
