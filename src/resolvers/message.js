import { ValidationError, UserInputError } from 'apollo-server-express'
// Custom modules
import { sendMessageValidator } from '../validators'
import { Message, User } from '../models'

export default {
  Query: {},
  Mutation: {
    async sendMessage(parent, args, { req }, info) {
      // Validate user inputs
      const { error, value } = sendMessageValidator.validate(args, { abortEarly: false })
      if (error) {
        const err = new ValidationError('StartChat validation failed.')
        err.joi = error
        throw err
      }
      // Values
      const { body, chatId } = value
      const { userId } = req.session

      return await Message.create({ body, chat: chatId, sender: userId })
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
