<template>
  <div class="min-h-screen">
    <div class="text-center mt-40">
      <h1 class="text-6xl">nuxernger</h1>
      <div v-if="authUser">
        <h1 class="text-3xl">{{ authUser.name }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import SignInFormVue from '@/components/auth/SignInForm.vue'
import SignUpFormVue from '@/components/auth/SignUpForm.vue'
import gql from 'graphql-tag'
import { mapActions } from 'vuex'

export default {
  name: 'index-page',
  data() {
    return {}
  },
  computed: {
    authUser() {
      return this.$store.getters['auth/authUser']
    }
  },
  methods: {
    ...mapActions({ signOut: 'auth/signOut' })
  }
}
</script>

<style></style>
