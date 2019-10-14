<template>
  <form @submit.prevent="handleSubmit" class="shadow-lg rounded border  px-16 py-12">
    <div style="width: 360px" class="text-center">
      <h3 class="text-4xl font-bold">Sign Up</h3>
      <ui-input
        v-model="signUp.email"
        classNames="mt-3"
        type="text"
        placeholder="Username"
      ></ui-input>

      <ui-input
        v-model="signUp.email"
        classNames="mt-3"
        type="text"
        placeholder="Full name"
      ></ui-input>

      <ui-input
        v-model="signUp.email"
        classNames="mt-3"
        type="email"
        placeholder="Email"
      ></ui-input>

      <ui-input
        v-model="signUp.password"
        classNames="mt-4"
        type="password"
        placeholder="Password"
      ></ui-input>

      <ui-button classNames="w-full mt-4">Sign Up</ui-button>
      <p class="mt-6 text-sm text-gray-600">
        Already have an account?
        <a @click="$emit('change-view')" class="text-primary cursor-pointer font-bold">Sign in</a>
      </p>
    </div>
  </form>
</template>

<script>
import InputVue from '@/components/ui-elements/Input.vue'
import ButtonVue from '../ui-elements/Button.vue'
export default {
  data() {
    return {
      signUp: {}
    }
  },
  methods: {
    handleSubmit() {
      // const { email, password } = this.signin
      // if (!email && !password) return
      const graphqlQuery = {
        query: `
        query {
          me {
            id
            name
          }
        }
      `
      }
      fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          console.log(data)
        })
    }
  },
  components: {
    uiInput: InputVue,
    uiButton: ButtonVue
  }
}
</script>

<style></style>
