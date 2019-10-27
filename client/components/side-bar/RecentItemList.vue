<template>
  <ul class="flex flex-col mt-3 w-full list-reset select-none">
    <recent-item
      v-for="chat in chatList"
      :title="chat.title"
      :chatId="chat.id"
      :lastMessage="chat.lastMessage || {}"
      :key="chat.id"
    />
  </ul>
</template>

<script>
import RecentItemVue from './RecentItem.vue'
import gql from 'graphql-tag'

export default {
  computed: {
    chatList() {
      return this.$store.getters['chat/chatList']
    }
  },
  components: {
    recentItem: RecentItemVue
  }
}
</script>

<style></style>
