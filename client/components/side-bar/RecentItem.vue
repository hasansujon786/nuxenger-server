<template>
  <nuxt-link
    :to="`/chats/${chatId}`"
    class="recent-item flex flex-no-wrap items-center cursor-pointer py-3 px-4"
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
      <div v-if="lastMessage.body" class="text-sm text-gray-500 truncate">
        <span> {{ senderName }}: {{ lastMessage.body }}</span>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import AvaterVue from '../ui-elements/Avater.vue'
import { mapGetters } from 'vuex'
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
    lastMessage: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/authUser'
    }),
    senderName() {
      const { name } = this.lastMessage.sender
      const spllietName = name.split(' ')[0]
      // console.log(spllietName)
      return this.currentUser.name === name ? 'You' : spllietName
    }
  },
  components: {
    avater: AvaterVue
  }
}
</script>

<style scoped>
.recent-item.nuxt-link-active {
  @apply bg-gray-200;
}
</style>
