import { gql } from 'apollo-server-express'

export default gql`
  extend type Subscription {
    chat(currentUserId: ID!): ChatSubscriptionPayload
  }

  extend type Query {
    chat(chatId: String): Chat! @auth
  }

  extend type Mutation {
    startGroupChat(title: String, userIds: [ID!]!): Chat @auth
    deleteAGroupChat(chatId: ID!): Chat @auth
  }

  type Chat {
    id: ID!
    title: String!
    users: [User]!
    messages: [Message]!
    lastMessage: Message
    createdAt: String!
    updatedAt: String!
  }

  type ChatSubscriptionPayload {
    mutation: String!
    data: Chat
  }
`
