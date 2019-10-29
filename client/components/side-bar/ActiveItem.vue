<template>
  <nuxt-link
    :to="`/chats/${user.username}`"
    class="recent-item theme-list flex flex-no-wrap items-center text-black cursor-pointer px-3 py-2"
  >
    <avater size="xs" classNames="mr-3" :name="user.name" img="" />
    <div class="flex flex-1 justify-between">
      <h2 class="text-sm">{{ user.name }}</h2>
      <span class="text-sm">
        {{ lastTime }}
      </span>
    </div>
  </nuxt-link>
</template>

<script>
import AvaterVue from '@/components/base/Avater.vue'

export default {
  props: ['user', 'lastTime'],
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
