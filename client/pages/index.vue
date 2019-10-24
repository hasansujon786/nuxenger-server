<template>
  <div class="min-h-screen bg-gray-200">
    <!-- <div class="text-center mt-40">
      <h1 class="text-6xl">nuxernger</h1>
      <div v-if="authUser">
        <h1 class="text-3xl">{{ authUser.name }}</h1>
      </div>
    </div> -->
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
