<template>
  <div class="font-sans">
    <!-- <nav class="flex">
      <span class="ml-auto mr-16 mt-5">
        <nuxt-link class="text-green-600 hover:underline m-3" to="/">Home</nuxt-link>
        <nuxt-link class="text-green-600 hover:underline m-3" to="/secret">Secret</nuxt-link>
        <nuxt-link class="text-green-600 hover:underline m-3" to="/random">Style guide</nuxt-link>
        <nuxt-link class="text-green-600 hover:underline m-3" to="/m/343">Open app</nuxt-link>
        <nuxt-link class="text-green-600 hover:underline m-3" to="/login">Sign in</nuxt-link>
        <button @click="signOut" class="text-green-600 hover:underline m-3">Sign out</button>
      </span>
    </nav> -->
    <h1 class="mt-10 text-center text-3xl" v-show="loading && !error">Loading...</h1>
    <h1 class="mt-10 text-center text-3xl" v-show="!loading && error">Somethign went wrong</h1>
    <nuxt v-show="!loading" />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({ error: 'auth/error', loading: 'auth/loading', authUser: 'auth/authUser' })
  },
  mounted() {
    this.getAuthUser()
  },
  methods: {
    async signOut() {
      const result = await this.$apollo.mutate({
        // Query
        mutation: gql`
          mutation {
            signOut
          }
        `
      })
      this.$store.dispatch('auth/setAuthUser', null)
      this.$router.push('/login')
    },
    async getAuthUser() {
      try {
        console.time('gerAuthUser')
        const res = await this.$apollo.query({
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
        this.$store.dispatch('auth/setAuthUser', res.data.me)
        console.log('authUser', res.data.me)
        // if (res.data.me === null) {
        //   console.info('redirect from default layout')
        //   this.$router.push('/login')
        // }

        this.$store.dispatch('auth/setLoading', false)
      } catch (err) {
        this.$router.push('/login')
        this.$store.dispatch('auth/error', true)
        this.$store.dispatch('auth/setLoading', false)
      }
    }
  }
}
</script>
