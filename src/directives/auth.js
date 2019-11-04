import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { ensureSignIn } from '../auth'

class authDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function(...args) {
      const [, , ctx] = args

      ensureSignIn(ctx.req)

      return resolve.apply(this, args)
    }
  }
}

export default authDirective
