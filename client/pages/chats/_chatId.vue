<template>
  <div class="flex flex-col flex-1">
    <chat-box-head :title="chat.title" />
    <chat-box userId="1" :msgs="chat.messages" />
    <chat-box-input @on-submit="submitNewMsg" />
  </div>
</template>

<script>
import ChatBoxHeadVue from '@/components/chat/ChatBoxHead.vue'
import ChatBoxVue from '@/components/chat/ChatBox.vue'
import ChatBoxInputVue from '@/components/chat/ChatBoxInput.vue'
import ChatWrapper from '@/components/chat/ChatWrapper.vue'
import gql from 'graphql-tag'

import { SEND_MESSAGE_MUTATION, CHAT_QUERY } from '@/gql'
import { scrollToBottomOfChatBox } from '@/utils'

export default {
  middleware: 'authenticated',
  data() {
    return {
      userId: null,
      chat: {}
    }
  },
  created() {
    console.log('created _chatId')
    const { chatId } = this.$route.params
    if (chatId) {
      this.getChat(chatId)
    }
  },
  methods: {
    async submitNewMsg(body) {
      const { chatId } = this.$route.params
      try {
        const { data } = await this.$apollo.mutate({
          // Query
          mutation: SEND_MESSAGE_MUTATION,
          variables: {
            chatId,
            body
          }
        })
      } catch (err) {
        console.log('error form submitNewMsg', { err })
      }
    },
    async getChat(userId) {
      try {
        // Call to the graphql mutation
        const { data } = await this.$apollo.query({
          // Query
          query: CHAT_QUERY,
          variables: {
            chatId: userId
          }
        })

        this.chat = data.chat
        setTimeout(() => {
          scrollToBottomOfChatBox({ el: 'chatboxBtm', smooth: false })
        }, 100)
      } catch (err) {
        console.log('error form getChat', { err })
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getChat(this.$route.params.chatId)
    }
  },
  apollo: {
    // Subscriptions
    $subscribe: {
      // When a tag is added
      message: {
        query: gql`
          subscription message($chatId: ID!) {
            message(chatId: $chatId) {
              mutation
              data {
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
        variables() {
          return {
            chatId: this.$route.params.chatId
          }
        },
        result({ data }) {
          const newMsg = data.message.data
          this.chat.messages.push(newMsg)
          setTimeout(() => {
            scrollToBottomOfChatBox({ el: 'chatboxBtm', smooth: false })
          }, 100)
        }
      }
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
