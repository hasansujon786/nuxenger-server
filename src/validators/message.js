import Joi from '@hapi/joi'

export const sendMessageValidator = Joi.object({
  body: Joi.string()
    .min(1)
    .max(200)
    .required()
    .label('Body'),
  chatId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/, 'valid Object ID') // mongodb ObjectId regex
    .required()
    .label('Chat ID')
})
