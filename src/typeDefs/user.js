import { gql } from 'apollo-server-express'

export default gql`
  extend type Subscription {
    count: Int!
  }
  extend type Query {
    me: User
    user(id: ID!): User @auth
    users: [User!]! @auth
    hello: String @upperCase @auth
  }

  extend type Mutation {
    signUp(email: String!, username: String!, name: String!, password: String!): User @guest
    signIn(email: String!, password: String!): User @guest
    signOut: Boolean
  }

  type User {
    id: ID!
    email: String!
    username: String!
    name: String!
    chats: [Chat]!
    createdAt: String!
    updatedAt: String!
  }
`
