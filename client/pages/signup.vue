<template>
  <div class="min-h-screen pt-16">
    <form-wrapper>
      <form @submit.prevent="handleSubmit" class="w-full text-center">
        <h3 class="text-4xl font-bold">Sign up</h3>
        <ui-input
          v-model="signUp.username"
          classNames="mt-3 rounded-full bg-gray-100 border"
          type="text"
          required
          placeholder="Username"
        ></ui-input>

        <ui-input
          v-model="signUp.fullname"
          classNames="mt-3 rounded-full bg-gray-100 border"
          type="text"
          required
          placeholder="Full name"
        ></ui-input>

        <ui-input
          required
          v-model="signUp.email"
          classNames="mt-3 rounded-full bg-gray-100 border"
          type="email"
          placeholder="Email"
        ></ui-input>

        <ui-input
          v-model="signUp.password"
          classNames="mt-3 rounded-full bg-gray-100 border"
          type="password"
          required
          placeholder="Password"
        ></ui-input>

        <ui-button classNames="w-full mt-4">Sign Up</ui-button>
        <p class="mt-6 text-sm text-gray-600">
          Already have an account?
          <nuxt-link to="/login" class="ml-1 text-primary font-bold">Sign in</nuxt-link>
        </p>
      </form>
    </form-wrapper>
  </div>
</template>

<script>
import InputVue from '@/components/ui-elements/Input.vue'
import ButtonVue from '@/components/ui-elements/Button.vue'
import FormWrapper from '@/components/auth/FormWrapper.vue'

export default {
  name: 'signUP',
  // layout: 'auth',
  middleware: 'guest',
  data() {
    return {
      inputStyles: 'mt-3 rounded-full bg-gray-100 border',
      signUp: {
        username: 'myUsername',
        fullname: 'My Full Name',
        email: 'email@gmail.com',
        password: 'Test123123'
      }
    }
  },
  mounted() {},

  methods: {
    handleSubmit() {
      // const { username, fullname, email, password } = this.signUp

      this.$store.dispatch('auth/signUp', this.signUp)
    }
  },
  components: {
    formWrapper: FormWrapper,
    uiInput: InputVue,
    uiButton: ButtonVue
  }
}
</script>
