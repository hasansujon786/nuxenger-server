<template>
  <div class="flex justify-between items-center w-full border-b border-gray-300">
    <span class="bg-blue-00 h-16 pl-3"></span>
    <span class="">
      <icon-btn
        @click="$store.dispatch('toggleSideBar')"
        :icon="$store.getters.getShowSideBar ? 'chevron-left' : 'chevron-right'"
        title="Toggle Recents"
      />
    </span>
    <div class="flex-auto cursor-pointer select-none py-2 pl-3 pr-6">
      <h2 class="font-semibold text-base -mb-1">{{ title }}</h2>
      <span class="text-grey-dark text-sm">
        2 members
      </span>
    </div>
  </div>
</template>

<script>
import IconBtnVue from '../ui-elements/IconBtn.vue'
export default {
  props: {
    title: {
      type: String,
      default: 'Loading...'
    }
  },
  components: {
    iconBtn: IconBtnVue
  }
}
</script>

<style></style>
