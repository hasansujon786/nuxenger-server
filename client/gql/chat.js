import gql from 'graphql-tag'

export const startChat = async ({ $apollo }, { title, userIds }) => {
  return await $apollo.mutate({
    // Query
    mutation: gql`
      mutation($title: String, $userIds: [ID!]!) {
        startChat(title: $title, userIds: $userIds) {
          id
          title
        }
      }
    `,
    // Parameters
    variables: {
      title,
      userIds
    }
  })
}
