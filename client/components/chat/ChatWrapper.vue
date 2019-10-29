<template>
  <section class="font-sans max-h-screen flex flex-col h-screen m-0">
    <div class="flex flex-auto overflow-hidden">
      <transition name="sidebar">
        <side-bar class="hidden lg:flex" v-show="$store.getters.getShowSideBar" />
      </transition>
      <slot></slot>
    </div>
  </section>
</template>

<script>
import SideBarVue from '@/components/side-bar/SideBar.vue'
import IconBtnVue from '@/components/base/IconBtn.vue'

export default {
  components: {
    sideBar: SideBarVue,
    iconBtn: IconBtnVue
  }
}
</script>

<style>
body {
  overflow: hidden;
}
</style>
