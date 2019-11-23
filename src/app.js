import { ApolloServer, PubSub } from 'apollo-server-express'
import { createServer } from 'https'
import connectRedis from 'connect-redis'
import session from 'express-session'
import mongoose from 'mongoose'
import express from 'express'
import redis from 'redis'
import cors from 'cors'

// GraphQL modules
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'

import {
  PORT,
  CLIENT_URL,
  MONGO_URI,
  NODE_ENV,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  REDIST_HOST,
  REDIST_PORT,
  REDIST_PASSWORD
} from './config'
const IN_PROD = NODE_ENV === 'production'

// main app
;(async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
    const app = express()

    app.get('/', (req, res, next) => {
      res.send('<h1>🚀 Nuxenger Server is up & running...</h1>')
    })

    // Headers & CORS Config
    app.disable('x-powered-by')
    var corsOptions = {
      origin: CLIENT_URL,
      credentials: true // <-- REQUIRED backend setting
    }
    app.use(cors(corsOptions))

    // RedisStore
    const RedisStore = connectRedis(session)
    const client = redis.createClient({
      host: REDIST_HOST,
      port: REDIST_PORT,
      password: REDIST_PASSWORD
    })
    client.on('error', err => console.error(err))

    // Session Configs
    app.use(
      session({
        store: new RedisStore({ client }),
        name: SESS_NAME,
        secret: SESS_SECRET,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
          maxAge: parseInt(SESS_LIFETIME),
          sameSite: true,
          secure: IN_PROD,
          httpOnly: false
        }
      })
    )

    // ApolloServer Configs
    const pubsub = new PubSub()
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: true,
      schemaDirectives,
      context: ({ req, res }) => ({ req, res, pubsub })
    })

    // server.applyMiddleware({ app })
    server.applyMiddleware({
      app,
      // path: '/',
      cors: false // disables the apollo-server-express cors to allow the cors middleware use
    })

    // WS subsription confog
    const httpServer = createServer(app)
    server.installSubscriptionHandlers(httpServer)

    httpServer.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
      // console.log(`Server ready at ws://localhost:${APP_PORT}${server.subscriptionsPath}`)
    })
  } catch (error) {
    console.error('Error in main app', error)
  }
})()
