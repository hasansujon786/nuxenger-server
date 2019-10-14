<template>
  <nuxt-link
    to="/m/243"
    class="recent-item flex flex-no-wrap items-center hover:bg-gray-400 cursor-pointer py-3 px-4"
  >
    <avater classNames="mr-3" />
    <div class="flex-1 min-w-0">
      <div class="flex justify-between mb-1">
        <h2 class="font-semibold text-sm">
          Laurie Stewart
        </h2>
        <span class="text-sm">
          Tue
        </span>
      </div>
      <div class="text-sm text-gray-700 truncate">
        <span>
          <span class="text-blue">You:</span> Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Ab quam perferendis nihil beatae, et accusamus voluptate quod sed necessitatibus ea
          provident! Ducimus consequuntur exercitationem cupiditate possimus consequatur sunt
          dignissimos voluptas?
        </span>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import AvaterVue from '../ui-elements/Avater.vue'
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
