<template>
  <div class="min-h-screen bg-gray-20 text-center overflow-y-scroll">
    <div class="pt-40">
      <h1 class="text-6xl">nuxernger</h1>
    </div>
    <p class="mt-10 text-gray-500 text-3xl">Loading...</p>
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
