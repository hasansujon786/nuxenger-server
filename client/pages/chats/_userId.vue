<template>
  <div class="flex flex-col flex-1">
    <chat-box-head :user="userId" />
    <chat-box userId="1" :msgs="chat.messages" />
    <chat-box-input @on-submit="handleSubmit" />
  </div>
</template>

<script>
import ChatBoxHeadVue from '@/components/chat/ChatBoxHead.vue'
import ChatBoxVue from '@/components/chat/ChatBox.vue'
import ChatBoxInputVue from '@/components/chat/ChatBoxInput.vue'
import gql from 'graphql-tag'

export default {
  middleware: 'authenticated',
  data() {
    return {
      userId: null,
      chat: {}
    }
  },
  mounted() {
    this.getChat(this.$route.params.userId)
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
  components: {
    chatBoxHead: ChatBoxHeadVue,
    chatBox: ChatBoxVue,
    chatBoxInput: ChatBoxInputVue
    // message:
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
