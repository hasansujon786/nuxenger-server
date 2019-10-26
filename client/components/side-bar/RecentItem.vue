<template>
  <nuxt-link
    :to="`/chats/${chatId}`"
    class="recent-item theme-list flex flex-no-wrap items-center cursor-pointer py-3 px-4"
  >
    <avater classNames="mr-3" />
    <div class="flex-1 min-w-0">
      <div class="flex justify-between mb-1">
        <h2 class="font-semibold text-sm">
          {{ title }}
        </h2>
        <span class="text-sm">
          Tue
        </span>
      </div>
      <div v-show="lastMsg" class="text-sm text-gray-700 truncate">
        <span> <span class="text-blue">You:</span> {{ lastMsg }}</span>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import AvaterVue from '../ui-elements/Avater.vue'
export default {
  props: {
    title: {
      type: String,
      default: 'New message'
    },
    chatId: {
      type: String,
      default: ''
    },
    lastMsg: String
  },
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
