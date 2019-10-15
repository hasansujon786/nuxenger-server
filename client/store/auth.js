export const state = () => ({
  loading: true,
  error: false,
  authUser: null,
  authPagOnfirstLoad: false,
  redirectFnc: null
})

// mutations ==============================
export const mutations = {
  _setAuthUser(state, newAuthUser) {
    state.authUser = newAuthUser
  },
  _setLoading(state, bool) {
    state.loading = bool
  },
  _authPagOnfirstLoad(state, { bool, redirect }) {
    state.authPagOnfirstLoad = bool
    state.redirectFnc = redirect
  }
}

// actions ==============================
export const actions = {
  setAuthUser({ commit }, newAuthUser) {
    commit('_setAuthUser', newAuthUser)
  },
  setLoading({ commit, dispatch, state, ...ctx }, bool) {
    console.log('authPagOnfirstLoad', state.authPagOnfirstLoad)
    if (state.authPagOnfirstLoad && !state.authUser) {
      // redirecting from store
      console.info('redirecting for invalid token & first load')
      state.redirectFnc('/login')
    }

    commit('_setLoading', bool)
  },
  authPagOnfirstLoad({ commit, ...ctx }, payload) {
    commit('_authPagOnfirstLoad', payload)
  }
}

// getters ==============================
export const getters = {
  authUser: state => state.authUser,
  loading: state => state.loading,
  error: state => state.error
}
