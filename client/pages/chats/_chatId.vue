<template>
  <chat-wrapper>
    <div class="flex flex-col flex-1">
      <chat-box-head :user="userId" />
      <chat-box userId="1" :msgs="chat.messages" />
      <chat-box-input @on-submit="handleSubmit" />
    </div>
  </chat-wrapper>
</template>

<script>
import ChatBoxHeadVue from '@/components/chat/ChatBoxHead.vue'
import ChatBoxVue from '@/components/chat/ChatBox.vue'
import ChatBoxInputVue from '@/components/chat/ChatBoxInput.vue'
import ChatWrapper from '@/components/chat/ChatWrapper.vue'
import gql from 'graphql-tag'

export default {
  middleware: 'authenticated',
  data() {
    return {
      userId: null,
      chat: {}
    }
  },
  created() {
    if (this.$route.params.chatId) {
      this.getChat(this.$route.params.chatId)
    }
  },
  methods: {
    handleSubmit(value) {
      const id = Math.random()
      this.msgs.push({ id, text: value, userId: '2' })
    },
    async getChat(userId) {
      try {
        // Call to the graphql mutation
        const { data } = await this.$apollo.query({
          // Query
          query: gql`
            query($chatId: String) {
              chat(chatId: $chatId) {
                id
                title
                messages {
                  id
                  body
                  sender {
                    id
                    name
                  }
                }
              }
            }
          `,
          // Parameters
          variables: {
            chatId: userId
          }
        })

        this.chat = data.chat
      } catch (err) {
        console.log({ err })
      }
    }
  },
  watch: {
    $route(to, from) {
      // console.log({ to }, { from })
      this.getChat(this.$route.params.chatId)
    }
  },
  components: {
    chatBoxHead: ChatBoxHeadVue,
    chatBox: ChatBoxVue,
    chatBoxInput: ChatBoxInputVue,
    chatWrapper: ChatWrapper
  }
}
</script>

<style>
.hover-trigger .hover-target {
  display: none;
}

.hover-trigger:hover .hover-target {
  display: block;
}
</style>
