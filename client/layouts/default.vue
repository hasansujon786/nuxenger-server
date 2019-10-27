<template>
  <div class="font-sans relative bg-gray-70">
    <div v-show="loading && !error" class="min-h-screen bg-gray-20 text-center overflow-y-scroll">
      <div class="pt-40">
        <h1 class="text-6xl vivify popInBottom">nuxernger</h1>
      </div>
      <p class="mt-10 text-gray-500 text-3xl vivify fadeIn">Loading...</p>
    </div>

    <h1 class="mt-10 text-center text-3xl" v-show="!loading && error">Somethign went wrong</h1>
    <nuxt v-show="!loading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      error: 'auth/error',
      loading: 'auth/loading'
    })
  },
  mounted() {
    this.$store.dispatch('auth/getAuthUserOnAppLoads', { path: this.$route.path })

    function handleFirstTab(e) {
      if (e.keyCode === 9) {
        document.body.classList.add('user-is-tabbing')

        window.removeEventListener('keydown', handleFirstTab)
        window.addEventListener('mousedown', handleMouseDownOnce)
      }
    }

    function handleMouseDownOnce() {
      document.body.classList.remove('user-is-tabbing')

      window.removeEventListener('mousedown', handleMouseDownOnce)
      window.addEventListener('keydown', handleFirstTab)
    }

    window.addEventListener('keydown', handleFirstTab)
  }
}
</script>
