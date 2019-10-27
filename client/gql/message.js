import gql from 'graphql-tag'

export const SEND_MESSAGE_MUTATION = gql`
  mutation($chatId: String!, $body: String!) {
    sendMessage(chatId: $chatId, body: $body) {
      id
      body
    }
  }
`
