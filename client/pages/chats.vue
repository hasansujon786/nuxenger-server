<template>
  <section class="font-sans max-h-screen flex flex-col h-screen m-0">
    <div class="flex flex-auto overflow-hidden">
      <transition name="sidebar">
        <side-bar class="hidden lg:flex" v-show="$store.getters.getShowSideBar" />
      </transition>
      <nuxt />
    </div>
  </section>
</template>

<script>
import SideBarVue from '@/components/side-bar/SideBar.vue'
import IconBtnVue from '@/components/ui-elements/IconBtn.vue'

export default {
  middleware: 'authenticated',
  components: {
    sideBar: SideBarVue,
    iconBtn: IconBtnVue
  },
  mounted() {
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
  methods: {}
}
</script>

<style>
body {
  overflow: hidden;
}
</style>
