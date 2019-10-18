<template>
  <form
    @submit.prevent="handleSubmit"
    style="width: 540px"
    class="shadow-lg rounded border px-16 py-12 mx-auto mt-32"
  >
    <div class="text-center">
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
        <a href="#" @click.prevent="$emit('change-view')" class="text-primary font-bold">Sign Up</a>
      </p>
      <a
        href="#"
        class="text-primary mt-8 font-bold"
        @click.prevent="$store.dispatch('auth/signOut')"
        >Sing out</a
      >
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
  mounted() {},
  methods: {
    handleSubmit() {
      const { email, password } = this.signin
      if (!email && !password) return
      this.$store.dispatch('auth/signIn', { email, password })
    }
  },
  components: {
    uiInput: InputVue,
    uiButton: ButtonVue
  }
}
</script>

<style></style>
