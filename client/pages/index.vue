<template>
  <div class="min-h-screen bg-gray-20 text-center overflow-y-scroll">
    <div class="pt-40">
      <h1 class="text-6xl">nuxernger</h1>
    </div>
    <p class="mt-10 text-gray-500 text-2xl">Home Page</p>
    <a href="/" class="text-green-600 hover:underline m-3">Reload</a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'index-page',
  computed: {
    authUser() {
      return this.$store.getters['auth/authUser']
    }
  }
}
</script>

<style></style>
