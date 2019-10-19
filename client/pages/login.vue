<template>
  <div class="min-h-screen pt-16">
    <form-wrapper>
      <form @submit.prevent="handleSubmit" class="w-full text-center">
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
          <nuxt-link to="/signup" class="ml-1 text-primary font-bold">Sign up</nuxt-link>
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
  name: 'login',
  // layout: 'auth',
  middleware: 'guest',
  data() {
    return {
      signin: {
        email: 'kuddus@gmail.com',
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
    formWrapper: FormWrapper,
    uiInput: InputVue,
    uiButton: ButtonVue
  }
}
</script>
