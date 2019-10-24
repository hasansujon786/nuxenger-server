import gql from 'graphql-tag'
import { signInMutation, meQuery } from '../gql/user'

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
    // console.log('authPagOnfirstLoad', state.authPagOnfirstLoad)
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
  setAuthUser({ commit }, { id, name, username, chats }) {
    commit('_setAuthUser', { id, name, username })

    this.commit('chat/_getChatList', chats)
    chats.length > 0
      ? this.$router.push({ name: 'chats-chatId', params: { chatId: chats[0].id } })
      : this.$router.push({ name: 'chats-chatId' })
  },
  async signIn({ dispatch }, payload) {
    try {
      // Call to the graphql mutation
      const { data } = await signInMutation(this.$router.app, payload)

      if (data.signIn) {
        // set authUser & chatList & redirect
        dispatch('setAuthUser', data.signIn)
      } else {
        this.$router.push('/login')
      }
    } catch (err) {
      this.$router.push('/login')
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
        this.$router.push('/login')
        setTimeout(() => {
          commit('_setAuthUser', null)
        }, 500)
      }
    } catch (err) {
      console.log({ err })
    }
  },
  async getAuthUserOnAppLoads({ dispatch }) {
    console.info('app first load from vuex')
    // Runs on App first loads
    if (!getters.loading) return // If app isn't loadin then exit & stop executing
    try {
      const { data } = await meQuery(this.$router.app)
      console.log({ authUser: data.me })

      if (data.me) {
        // set authUser & chatList & redirect
        dispatch('setAuthUser', data.me)

        setTimeout(() => dispatch('setLoading', false), 100)
      } else {
        this.$router.push('/login')
        dispatch('setLoading', false)
      }
    } catch (err) {
      this.$router.push('/login')
      dispatch('setLoading', false)
      console.log({ err })
    }
  },
  async signUp({}, { email, password, username, fullname }) {
    const { $apollo } = this.$router.app
    try {
      // Call to the graphql mutation
      const { data } = await $apollo.mutate({
        // Query
        mutation: gql`
          mutation($email: String!, $password: String!, $username: String!, $fullname: String!) {
            signUp(email: $email, password: $password, username: $username, name: $fullname) {
              id
            }
          }
        `,
        // Parameters
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
