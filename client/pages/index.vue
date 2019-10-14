<template>
  <div class="flex-center flex-col min-h-screen">
    <h1 class="text-4xl">{{ hello }}</h1>
    <sign-in-form @change-view="showSignIn = !showSignIn" v-if="showSignIn"></sign-in-form>
    <sign-up-form @change-view="showSignIn = !showSignIn" v-else></sign-up-form>

    <!-- links -->
    <div class="mt-20">
      <button @click="signOut">Sign out</button>
      <nuxt-link class="text-green-600 hover:underline m-3" to="/random">Style guide</nuxt-link>
      <nuxt-link class="text-green-600 hover:underline m-3" to="/m/343">Open app</nuxt-link>
    </div>
  </div>
</template>

<script>
import SignInFormVue from '@/components/auth/SignInForm.vue'
import SignUpFormVue from '@/components/auth/SignUpForm.vue'
import { API_ENDPOINT } from '@/config'
import gql from 'graphql-tag'

export default {
  name: 'index-page',
  data() {
    return {
      showSignIn: true
    }
  },
  apollo: {
    hello: gql`
      query {
        hello
      }
    `
  },
  mounted() {},
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

      console.log(result)
    }
  },
  components: {
    signInForm: SignInFormVue,
    signUpForm: SignUpFormVue
  }
}
</script>

<style></style>
