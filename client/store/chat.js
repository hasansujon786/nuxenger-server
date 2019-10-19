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
export const actions = {}
// getters ==============================
export const getters = {
  chatList: state => state.chatList
}
