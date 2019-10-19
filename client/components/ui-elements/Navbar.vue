<template>
  <nav class="h-16 sticky w-full top-0 items-center pt-1 flex justify-center shadow-md">
    <nuxt-link class="text-green-600 hover:underline m-3" to="/">Home</nuxt-link>
    <nuxt-link class="text-green-600 hover:underline m-3" to="/secret">Secret</nuxt-link>
    <nuxt-link class="text-green-600 hover:underline m-3" to="/random">Style guide</nuxt-link>
    <nuxt-link class="text-green-600 hover:underline m-3" to="/chats">Open app</nuxt-link>
    <nuxt-link v-if="!authUser" class="text-green-600 hover:underline m-3" to="/login"
      >Sign In</nuxt-link
    >
    <nuxt-link v-if="!authUser" class="text-green-600 hover:underline m-3" to="/signup"
      >Sign up</nuxt-link
    >
    <a href="#" v-if="authUser" @click.prevent="signOut" class="text-green-600 hover:underline m-3"
      >Sign Out</a
    >
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      authUser: 'auth/authUser'
    })
  },
  methods: {
    ...mapActions({
      signOut: 'auth/signOut'
    })
  }
}
</script>

<style></style>
