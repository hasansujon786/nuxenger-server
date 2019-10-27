import gql from 'graphql-tag'

export const START_CHAT_MUTATION = gql`
  mutation($title: String, $userIds: [ID!]!) {
    startChat(title: $title, userIds: $userIds) {
      id
      title
    }
  }
`

export const CHAT_QUERY = gql`
  query($chatId: String) {
    chat(chatId: $chatId) {
      id
      title
      messages {
        id
        body
        sender {
          id
          name
        }
      }
    }
  }
`
