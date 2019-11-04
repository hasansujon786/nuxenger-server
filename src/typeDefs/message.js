import { gql } from 'apollo-server-express'

export default gql`
  extend type Subscription {
    message(chatId: ID!): MessageSubscriptionPayload
  }

  extend type Mutation {
    sendMessage(chatId: String!, body: String!): Message @auth
  }

  type Message {
    id: ID!
    body: String!
    sender: User
    chat: Chat!
    createdAt: String!
    updatedAt: String!
  }

  type MessageSubscriptionPayload {
    mutation: String!
    data: Message
  }
`
