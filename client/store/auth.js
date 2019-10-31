import { SIGN_IN_MUTATION, SIGN_OUT_MUTATION, ME_QUERY, SIGN_UP_MUTATION } from '../gql'

export const state = () => ({
  loading: false,
  error: false,
  errorMsg: '',
  authUser: {},
  authPagOnfirstLoad: false
})

// mutations ==============================
export const mutations = {
  _SET_AUTH_USER(state, newAuthUser) {
    state.authUser = newAuthUser
  },
  _SET_LOADING(state, bool) {
    state.loading = bool
  },
  _DISPLAY_ERROR(state, { err, msg }) {
    state.error = true
    state.errorMsg = msg
  },
  _DISMISS_ERROR(state) {
    state.error = false
    state.errorMsg = ''
  },
  _AUTH_PAGE_ON_FIRST_LOAD(state, bool) {
    state.authPagOnfirstLoad = bool
  }
}

// actions ==============================
export const actions = {
  setLoading({ state, commit }, bool) {
    // console.log('authPagOnfirstLoad', state.authPagOnfirstLoad)
    if (state.authPagOnfirstLoad && !state.authUser) {
      // Auth Middleware (token && authUser === null && loading)
      console.info('redirecting for invalid token & first load')
      this.$router.push('/login')
      commit('_SET_LOADING', bool)
    }

    commit('_SET_LOADING', bool)
  },
  authPagOnfirstLoad({ commit }, bool) {
    // Auth Middleware (token && authUser === null && loading)
    commit('_AUTH_PAGE_ON_FIRST_LOAD', bool)
  },
  setAuthUser({ commit }, { id, name, username, chats, path }) {
    commit('_SET_AUTH_USER', { id, name, username })

    this.commit('chat/_getChatList', chats)
    if (path === '/' || path === '/chats' || path === '/login') {
      // console.log('redirect form setAuther dispatc')
      chats.length > 0
        ? this.$router.push({ name: 'chats-chatId', params: { chatId: chats[0].id } })
        : this.$router.push({ name: 'chats-chatId' })
    }
  },
  async signIn({ dispatch }, { email, password, path }) {
    try {
      // Call to the graphql mutation
      dispatch('setLoading', true)
      const { data } = await this.$router.app.$apollo.mutate({
        mutation: SIGN_IN_MUTATION,
        variables: {
          email,
          password
        }
      })

      setTimeout(() => dispatch('setLoading', false), 1000)
      if (data.signIn) {
        // set authUser & chatList & redirect
        dispatch('setAuthUser', { ...data.signIn, path })
      }
    } catch (err) {
      this.$router.push('/login')
      dispatch('displayError', { err, msg: 'Error in signIn' })
    }
  },
  async signOut({ commit }) {
    try {
      const { data } = await this.$router.app.$apollo.mutate({
        mutation: SIGN_OUT_MUTATION
      })

      if (data.signOut) {
        this.$router.push('/login')
        setTimeout(() => {
          commit('_SET_AUTH_USER', null)
        }, 500)
      }
    } catch (err) {
      dispatch('displayError', { err, msg: 'Error in signOut' })
    }
  },
  async getAuthUserOnAppLoads({ dispatch }, { path }) {
    console.info('app first load from vuex')
    // Runs on App first loads
    try {
      const { data } = await this.$router.app.$apollo.query({
        query: ME_QUERY
      })

      if (data.me) {
        // set authUser & chatList & redirect
        dispatch('setAuthUser', { ...data.me, path })
      } else {
        this.$router.push('/login')
      }
    } catch (err) {
      this.$router.push('/login')
      dispatch('displayerror', { err, msg: 'error in getauthuseronapploads' })
    }
  },
  async signUp({}, { email, password, username, fullname }) {
    try {
      // Call to the graphql mutation
      const { data } = await this.$router.app.$apollo.mutate({
        mutation: SIGN_UP_MUTATION,
        variables: {
          email,
          password,
          username,
          fullname
        }
      })

      // TODO: Show a successfull popup
      // if(data.signUp) { }

      this.$router.push('/login')
    } catch (err) {
      dispatch('displayError', { err, msg: 'Error in signUp' })
    }
  },
  displayError({ commit }, errorObj) {
    console.log(JSON.stringify(errorObj.err, null, 4))
    // console.dir(errorObj.err, { depth: null })
    // console.log(errorObj.err)
    commit('_SET_LOADING', false)
    commit('_DISPLAY_ERROR', errorObj)
  },
  dismissError({ commit }) {
    commit('_DISMISS_ERROR')
  }
}

// getters ==============================
export const getters = {
  authUser: state => state.authUser,
  loading: state => state.loading,
  error: state => state.error,
  errorMsg: state => state.errorMsg
}
