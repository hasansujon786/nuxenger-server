<template>
  <nuxt-link
    to="/users/343"
    class="recent-item flex flex-no-wrap items-center hover:bg-gray-400 text-black cursor-pointer px-3 py-2"
  >
    <avater size="xs" classNames="mr-3" img="https://randomuser.me/api/portraits/women/33.jpg" />
    <div class="flex flex-1 justify-between">
      <h2 class="text-sm">
        Laurie Stewart
      </h2>
      <span class="text-sm">
        Tue
      </span>
    </div>
  </nuxt-link>
</template>

<script>
import AvaterVue from '@/components/ui-elements/Avater.vue'
export default {
  components: {
    avater: AvaterVue
  }
}
</script>

<style scoped>
.recent-item {
  &.active {
    @apply bg-gray-200;
  }
}
</style>
