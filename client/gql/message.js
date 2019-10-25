import gql from 'graphql-tag'

export const sendNewMsg = async ({ $apollo }, { chatId, body }) => {
  console.log('from sendNewMsg')
  return await $apollo.mutate({
    // Query
    mutation: gql`
      mutation($chatId: String!, $body: String!) {
        sendMessage(chatId: $chatId, body: $body) {
          id
          body
        }
      }
    `,
    // Parameters
    variables: {
      chatId,
      body
    }
  })
}
