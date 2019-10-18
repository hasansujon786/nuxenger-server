<template>
  <div class="font-sans relative bg-gray-700">
    <nav
      v-if="this.$route.name !== 'chats-chatId'"
      class="h-16 sticky w-full top-0 items-center pt-1 flex justify-center shadow-md"
    >
      <nuxt-link class="text-green-600 hover:underline m-3" to="/">Home</nuxt-link>
      <nuxt-link class="text-green-600 hover:underline m-3" to="/secret">Secret</nuxt-link>
      <nuxt-link class="text-green-600 hover:underline m-3" to="/random">Style guide</nuxt-link>
      <nuxt-link class="text-green-600 hover:underline m-3" to="/chats">Open app</nuxt-link>
      <nuxt-link v-if="!authUser" class="text-green-600 hover:underline m-3" to="/login"
        >Sign In</nuxt-link
      >
      <a href="#" v-else @click.prevent="signOut" class="text-green-600 hover:underline m-3"
        >Sign Out</a
      >
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
