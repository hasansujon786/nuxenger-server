import gql from 'graphql-tag'

export const signInMutation = async ({ $apollo }, { email, password }) => {
  console.log('from signInMutation')
  return await $apollo.mutate({
    // Query
    mutation: gql`
      mutation($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          id
          name
          username
          chats {
            id
            title
            lastMessage {
              id
              body
            }
          }
        }
      }
    `,
    // Parameters
    variables: {
      email,
      password
    }
  })
}

export const meQuery = async ({ $apollo }) => {
  console.log(' from meQuery')
  return await $apollo.query({
    query: gql`
      query me {
        me {
          id
          name
          username
          chats {
            id
            title
            lastMessage {
              id
              body
            }
          }
        }
      }
    `
  })
}
