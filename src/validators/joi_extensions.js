import Joi from '@hapi/joi'
import mongoose from 'mongoose'

export function objectID(joi) {
  return {
    type: 'string',
    name: 'string',
    base: joi.string(),
    language: {
      objectID: 'must be a valid Object ID'
    },
    rules: [
      {
        name: 'objectID',
        validate(params, value, state, options) {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return this.createError('string.objectId', { value }, state, options)
          }
          return value
        }
      }
    ]
  }
}

// export default Joi.extend(objectID)
;('use strict')

var assert = require('assert')
var defaultMessage = 'valid mongo id'

module.exports = function joiObjectId(Joi, message) {
  assert(Joi && Joi.object, 'you must pass Joi as an argument')
  if (message == undefined) {
    message = defaultMessage
  }
  return function objectId() {
    return Joi.string().regex(/^[0-9a-fA-F]{24}$/, message)
  }
}
