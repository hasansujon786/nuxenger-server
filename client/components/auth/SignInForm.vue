<template>
  <form @submit.prevent="handleSubmit" class="shadow-lg rounded border px-16 py-12">
    <div style="width: 360px" class="text-center">
      <h3 class="text-4xl font-bold">Sign in</h3>
      <ui-input
        v-model="signin.email"
        placeholder="Email"
        classNames="mt-3"
        type="email"
        required
      ></ui-input>

      <ui-input
        v-model="signin.password"
        placeholder="Password"
        classNames="mt-4"
        type="password"
        required
      ></ui-input>

      <ui-button classNames="w-full mt-4">Sign in</ui-button>
      <p class="mt-6 text-sm text-gray-600">
        Don't have any account?
        <a @click="$emit('change-view')" class="text-primary cursor-pointer font-bold">Sign Up</a>
      </p>
    </div>
  </form>
</template>

<script>
import gql from 'graphql-tag'
import InputVue from '@/components/ui-elements/Input.vue'
import ButtonVue from '../ui-elements/Button.vue'
import { API_ENDPOINT } from '@/config'
export default {
  data() {
    return {
      signin: {
        email: 'hasan@gmail.com',
        password: 'Test123123'
      }
    }
  },
  methods: {
    handleSubmit() {
      const { email, password } = this.signin
      if (!email && !password) return
      this.signIn(email, password)
    },
    async signIn(userEmail, userPassword) {
      // Call to the graphql mutation
      const result = await this.$apollo.mutate({
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
          email: userEmail,
          password: userPassword
        }
      })

      console.log(result)
    }
  },
  components: {
    uiInput: InputVue,
    uiButton: ButtonVue
  }
}
</script>

<style></style>
