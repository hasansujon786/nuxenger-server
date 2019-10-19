import gql from 'graphql-tag'

export const state = () => ({
  chatList: []
})
// mutations ==============================
export const mutations = {
  _getChatList(state, chatList) {
    state.chatList = chatList
  }
}
// actions ==============================
export const actions = {
  async getChatList({ commit }) {
    console.info('action getChatList')
    const { $apollo } = this.$router.app
    try {
      const { data } = await $apollo.query({
        query: gql`
          query me {
            me {
              id
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
      commit('_getChatList', data.me.chats)
    } catch (e) {
      console.log(e)
    }
  }
}
// getters ==============================
export const getters = {
  chatList: state => state.chatList
}
