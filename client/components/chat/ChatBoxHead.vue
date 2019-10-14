<template>
  <div class="flex h-16 justify-between items-center w-full border-b border-gray-300">
    <span class="pl-3 pr-0">
      <icon-btn
        @click="$store.dispatch('toggleSideBar')"
        :icon="$store.getters.getShowSideBar ? 'chevron-left' : 'chevron-right'"
        title="Toggle Recents"
      />
    </span>
    <div class="flex-auto cursor-pointer select-none py-2 pl-3 pr-6">
      <h2 class="font-semibold text-base -mb-1">Youtubers Pro Gaming {{ user }}</h2>
      <span class="text-grey-dark text-sm">
        12 members
      </span>
    </div>
    <ul class="flex list-reset py-2 px-4">
      <li class="px-4">
        <a href="#" class="no-underline text-grey hover:text-grey-dark">
          <i class="fas fa-search"></i>
        </a>
      </li>
      <li class="px-4">
        <a href="#" class="no-underline text-grey hover:text-grey-dark">
          <i class="fas fa-ellipsis-v"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import IconBtnVue from '../ui-elements/IconBtn.vue'
export default {
  props: ['user'],
  components: {
    iconBtn: IconBtnVue
  }
}
</script>

<style></style>
