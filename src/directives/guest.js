import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { ensureSignOut } from '../auth'

class guesDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function(...args) {
      const [, , ctx] = args

      ensureSignOut(ctx.req)

      return resolve.apply(this, args)
    }
  }
}

export default guesDirective
