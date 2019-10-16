<template>
  <div class="font-sans">
    <nav class="flex">
      <span class="ml-auto mr-16 mt-5">
        <nuxt-link class="text-green-600 hover:underline m-3" to="/">Home</nuxt-link>
        <nuxt-link class="text-green-600 hover:underline m-3" to="/secret">Secret</nuxt-link>
        <nuxt-link class="text-green-600 hover:underline m-3" to="/random">Style guide</nuxt-link>
        <nuxt-link class="text-green-600 hover:underline m-3" to="/chats/343">Open app</nuxt-link>
        <nuxt-link class="text-green-600 hover:underline m-3" to="/login">Sign in</nuxt-link>
        <button @click="signOut" class="text-green-600 hover:underline m-3">Sign out</button>
      </span>
    </nav>
    <h1 class="mt-10 text-center text-3xl" v-show="loading && !error">Loading...</h1>
    <h1 class="mt-10 text-center text-3xl" v-show="!loading && error">Somethign went wrong</h1>
    <nuxt v-show="!loading" />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      error: 'auth/error',
      loading: 'auth/loading',
      authUser: 'auth/authUser'
    })
  },
  mounted() {
    this.getAuthUserOnAppLoads()
  },
  methods: {
    ...mapActions({
      signOut: 'auth/signOut',
      getAuthUserOnAppLoads: 'auth/getAuthUserOnAppLoads'
    })
  }
}
</script>
