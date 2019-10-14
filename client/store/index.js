export const state = () => ({
  theme: 'dark',
  showSideBar: true
})
// mutations ==============================
export const mutations = {
  _setTheme(state, theme) {
    state.theme = theme
  },
  _toggleSideBar(state) {
    state.showSideBar = !state.showSideBar
  }
}
// actions ==============================
export const actions = {
  setTheme({ commit }, theme) {
    commit('_setTheme', theme)
  },
  toggleSideBar({ commit }) {
    commit('_toggleSideBar')
  }
}
// getters ==============================
export const getters = {
  getTheme: state => state.theme,
  getShowSideBar: state => state.showSideBar
}
