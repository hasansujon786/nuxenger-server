<template>
  <div class="font-sans relative bg-gray-70">
    <h1 class="mt-10 text-center text-3xl" v-show="loading && !error">Loading...</h1>
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
