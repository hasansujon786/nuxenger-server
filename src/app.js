import { ApolloServer, gql } from 'apollo-server-express'
import mongoose from 'mongoose'
import express from 'express'

import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { APP_PORT, MONGO_URI } from './config'

// main app
;(async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    const app = express()

    app.disable('x-powered-by')

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: true,
    })

    server.applyMiddleware({ app })

    app.listen({ port: APP_PORT }, () =>
      console.log(`Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`),
    )
  } catch (error) {
    console.error(error)
  }
})()
