import Joi from '@hapi/joi'

export const startGroupChatValidator = userId =>
  Joi.object({
    title: Joi.string()
      .min(4)
      .max(50)
      .label('Title'),
    userIds: Joi.array()
      .min(1)
      .max(100)
      .unique()
      .items(
        Joi.string()
          .not(userId)
          .regex(/^[0-9a-fA-F]{24}$/, 'valid Object ID') // mongodb ObjectId regex
          .label('User ID')
      )
      .label('User IDs')
  })
