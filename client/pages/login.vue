<template>
  <div class="flex-center flex-col min-h-screen">
    <sign-in-form @change-view="showSignIn = !showSignIn" v-if="showSignIn"></sign-in-form>
    <sign-up-form @change-view="showSignIn = !showSignIn" v-else></sign-up-form>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import SignInFormVue from '@/components/auth/SignInForm.vue'
import SignUpFormVue from '@/components/auth/SignUpForm.vue'

export default {
  name: 'login',
  // layout: 'auth',
  // middleware: 'guest',
  data() {
    return {
      showSignIn: true
    }
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
      this.$store.dispatch('auth/setAuthUser', null)
      this.$router.push('/login')
    },
    test() {}
  },
  components: {
    signInForm: SignInFormVue,
    signUpForm: SignUpFormVue
  }
}
</script>

<style></style>
