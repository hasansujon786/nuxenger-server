import { ApolloServer, gql } from 'apollo-server-express'
import mongoose from 'mongoose'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import redis from 'redis'

import typeDefs from './typeDefs'
import resolvers from './resolvers'
import {
  APP_PORT,
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
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    const app = express()

    app.disable('x-powered-by')

    // RedisStore
    const RedisStore = connectRedis(session)
    const client = redis.createClient({
      host: REDIST_HOST,
      port: REDIST_PORT,
      password: REDIST_PASSWORD
    })

    // Session Configs
    app.use(
      session({
        store: new RedisStore({ client }),
        name: SESS_NAME,
        secret: SESS_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: parseInt(SESS_LIFETIME),
          sameSite: true,
          secure: IN_PROD
        }
      })
    )

    app.get('/set', (req, res) => {
      req.session.name = 'kussus'
      res.send('setting')
    })
    app.get('/get', (req, res) => {
      console.log('getting', req.session.name)
      res.send(req.session.name)
    })

    // ApolloServer Configs
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: !IN_PROD,
      context: ({ req, res }) => ({ req, res })
    })

    server.applyMiddleware({ app, cors: false })

    app.listen({ port: APP_PORT }, () =>
      console.log(`Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (error) {
    console.error('Error in main app', error)
  }
})()
