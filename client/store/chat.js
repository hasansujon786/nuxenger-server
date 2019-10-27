export const state = () => ({
  chatList: []
})
// mutations ==============================
export const mutations = {
  _getChatList(state, chatList) {
    state.chatList = chatList
  },
  _newChatAdded(state, chat) {
    state.chatList.unshift(chat)
  }
}
// actions ==============================
export const actions = {
  updateChatList({ commit }, { mutation, data }) {
    switch (mutation) {
      case 'NEW_CHAT':
        commit('_newChatAdded', data)
        break

      default:
        break
    }
  }
}
// getters ==============================
export const getters = {
  chatList: state => state.chatList
}
