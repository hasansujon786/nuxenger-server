<template>
  <nuxt-link
    :to="`/chats/${user.username}`"
    class="recent-item flex flex-no-wrap items-center hover:bg-gray-400 text-black cursor-pointer px-3 py-2"
  >
    <avater size="xs" classNames="mr-3" :name="user.name" img="" />
    <div class="flex flex-1 justify-between">
      <h2 class="text-sm">{{ user.name }}</h2>
      <span class="text-sm">
        Tue
      </span>
    </div>
  </nuxt-link>
</template>

<script>
import AvaterVue from '@/components/ui-elements/Avater.vue'

export default {
  props: ['user'],
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
