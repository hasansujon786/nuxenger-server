<template>
  <div class="flex flex-col flex-1">
    <chat-box-head :user="userId" />
    <chat-box userId="1" :msgs="msgs" />
    <chat-box-input @on-submit="handleSubmit" />
  </div>
</template>

<script>
import ChatBoxHeadVue from '@/components/chat/ChatBoxHead.vue'
import ChatBoxVue from '@/components/chat/ChatBox.vue'
import ChatBoxInputVue from '@/components/chat/ChatBoxInput.vue'
export default {
  layout: 'message',
  data() {
    return {
      userId: null,
      msgs: [
        { id: '1', text: 'Hello how from hasan', userId: '1' },
        { id: '2', text: 'Hello how aryou', userId: '2' },
        { id: '3', text: 'Hello how aryou', userId: '2' },
        { id: '4', text: 'Hello how from hasan', userId: '1' }
      ]
    }
  },
  methods: {
    handleSubmit(value) {
      const id = Math.random()
      this.msgs.push({ id, text: value, userId: '2' })
    }
  },
  mounted() {
    this.userId = this.$route.params.userId
  },
  components: {
    chatBoxHead: ChatBoxHeadVue,
    chatBox: ChatBoxVue,
    chatBoxInput: ChatBoxInputVue
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
