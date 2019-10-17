import gql from 'graphql-tag'

export const state = () => ({
  loading: true,
  error: false,
  authUser: {},
  authPagOnfirstLoad: false
})

// mutations ==============================
export const mutations = {
  _setAuthUser(state, newAuthUser) {
    state.authUser = newAuthUser
  },
  _setLoading(state, bool) {
    state.loading = bool
  },
  _authPagOnfirstLoad(state, bool) {
    state.authPagOnfirstLoad = bool
  }
}

// actions ==============================
export const actions = {
  setLoading({ state, commit }, bool) {
    console.log('authPagOnfirstLoad', state.authPagOnfirstLoad)
    if (state.authPagOnfirstLoad && !state.authUser) {
      // Auth Middleware (token && authUser === null && loading)
      console.info('redirecting for invalid token & first load')
      this.$router.push('/login')
      commit('_setLoading', bool)
    }

    commit('_setLoading', bool)
  },
  authPagOnfirstLoad({ commit }, bool) {
    // Auth Middleware (token && authUser === null && loading)
    commit('_authPagOnfirstLoad', bool)
  },
  setAuthUser({ commit }, newAuthUser) {
    commit('_setAuthUser', newAuthUser)
  },
  async signIn({ commit }, { email, password }) {
    const { $apollo } = this.$router.app
    try {
      // Call to the graphql mutation
      const res = await $apollo.mutate({
        // Query
        mutation: gql`
          mutation($email: String!, $password: String!) {
            signIn(email: $email, password: $password) {
              id
              name
              username
            }
          }
        `,
        // Parameters
        variables: {
          email,
          password
        }
      })

      commit('_setAuthUser', res.data.signIn)
      this.$router.push('/')
    } catch (err) {
      console.log({ err })
    }
  },
  async signOut({ commit }) {
    const { $apollo } = this.$router.app
    try {
      const { data } = await $apollo.mutate({
        // Query
        mutation: gql`
          mutation {
            signOut
          }
        `
      })
      if (data.signOut) {
        commit('_setAuthUser', null)
        this.$router.push('/login')
      }
    } catch (err) {
      console.log({ err })
    }
  },
  async getAuthUserOnAppLoads({ getters, commit, dispatch }) {
    // Runs on App first loads
    const { $apollo } = this.$router.app
    console.log('app first load from vuex')

    // If app isn't loadin then exit & stop executing
    if (!getters.loading) return

    try {
      console.time('gerAuthUser')
      const { data } = await $apollo.query({
        query: gql`
          query me {
            me {
              id
              name
              username
            }
          }
        `
      })
      console.timeEnd('gerAuthUser')
      // set store
      dispatch('setAuthUser', data.me)
      dispatch('setLoading', false)
      console.log({ authUser: data.me })
    } catch (err) {
      this.$router.push('/login')
      dispatch('setLoading', false)
      console.log({ err })
    }
  }
}

// getters ==============================
export const getters = {
  authUser: state => state.authUser,
  loading: state => state.loading,
  error: state => state.error
}
