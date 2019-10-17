<template>
  <ul class="flex flex-col mt-3 w-full list-reset select-none">
    <recent-item :title="chat.title" :chatId="chat.id" v-for="chat in me.chats" :key="chat.id" />
  </ul>
</template>

<script>
import RecentItemVue from './RecentItem.vue'
import gql from 'graphql-tag'

export default {
  data() {
    return {
      me: {}
    }
  },
  apollo: {
    me: gql`
      query me {
        me {
          id
          chats {
            id
            title
            lastMessage {
              id
              body
            }
          }
        }
      }
    `
  },
  components: {
    recentItem: RecentItemVue
  }
}
</script>

<style></style>
