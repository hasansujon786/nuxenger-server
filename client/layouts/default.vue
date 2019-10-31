<template>
  <div class="font-sans relative min-h-screen">
    <div v-if="!loading && error">
      <h1 class="text-4xl">ERROR</h1>
      <h1 class="text-xl">{{ errorMsg }}</h1>
      <button @click="$store.dispatch('auth/dismissError')">X</button>
    </div>
    <nx-loading v-if="loading" />
    <div v-else>
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoadingVue from '@/components/auth/Loading.vue'

export default {
  computed: {
    ...mapGetters({
      error: 'auth/error',
      loading: 'auth/loading',
      errorMsg: 'auth/errorMsg'
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
  },
  components: {
    nxLoading: LoadingVue
  }
}
</script>

<style lang="scss">
.__nuxt-error-page {
  svg {
    display: inline;
  }
}
</style>
