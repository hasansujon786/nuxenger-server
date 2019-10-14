<template>
  <div class="flex mt-3">
    <div class="avater-wrapper" :class="{ r: isUser, l: !isUser }">
      <avater size="xs" classNames="-mt-2" />
    </div>
    <chat-bubble :tail="isUser ? 'r' : 'l'">{{ msg.text }}</chat-bubble>
  </div>
</template>

<script>
import ChatBubble from './ChatBubble.vue'
import Avater from '@/components/ui-elements/Avater.vue'
export default {
  data() {
    return {}
  },
  computed: {
    isUser() {
      return this.userId === this.msg.userId
    }
  },
  props: ['msg', 'userId'],
  components: {
    chatBubble: ChatBubble,
    avater: Avater
  }
}
</script>

<style scoped lang="scss">
.avater-wrapper {
  display: inline-flex;

  &.r {
    order: 2;
  }
  &.l {
    order: 0;
  }
}

.chat-item-enter-active,
.chat-item-leave-active {
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
}
.chat-item-enter,
.chat-item-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
