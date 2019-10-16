<template>
  <div class="flex-center flex-col min-h-screen">
    <h1 class="text-6xl">nuxernger</h1>
    <div v-if="authUser">
      <h1 class="text-3xl">{{ authUser.name }}</h1>
    </div>
    <div>
      <h1 class="text-3xl">{{ hello }}</h1>
    </div>
    <div>
      <nuxt-link class="text-green-600 hover:underline m-3" to="/secret">Secret page</nuxt-link>
    </div>
    <div v-if="authUser">
      <button @click="signOut" class="text-green-600 hover:underline m-3">Sign out</button>
    </div>
    <div v-else>
      <nuxt-link class="text-green-600 hover:underline m-3" to="/login">Sign in</nuxt-link>
    </div>
  </div>
</template>

<script>
import SignInFormVue from '@/components/auth/SignInForm.vue'
import SignUpFormVue from '@/components/auth/SignUpForm.vue'
import { API_ENDPOINT } from '@/config'
import gql from 'graphql-tag'
import { mapActions } from 'vuex'

export default {
  name: 'index-page',
  mounted() {
    console.log('index page mounted')
  },
  data() {
    return {}
  },
  computed: {
    authUser() {
      return this.$store.getters['auth/authUser']
    }
  },
  apollo: {
    hello: gql`
      {
        hello
      }
    `
  },
  methods: {
    ...mapActions({ signOut: 'auth/signOut' })
  }
}
</script>

<style></style>
