<template>
  <div class="mt-3">
    <div class="flex">
      <span class="text-sm toolbox" :class="{ r: isUser, l: !isUser }">{{ msg.sender.name }}</span>
    </div>
    <div class="flex ">
      <div class="avater-wrapper" :class="{ r: isUser, l: !isUser }">
        <avater :name="msg.sender.name" size="xs" classNames="-mt-2" />
      </div>
      <chat-bubble :tail="isUser ? 'r' : 'l'">{{ msg.body }}</chat-bubble>
    </div>
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
      return this.currentUserId === this.msg.sender.id
    }
  },
  props: ['msg', 'currentUserId'],
  components: {
    chatBubble: ChatBubble,
    avater: Avater
  }
}
</script>

<style lang="scss" scoped>
.avater-wrapper {
  display: inline-flex;

  &.r {
    order: 2;
  }
  &.l {
    order: 0;
  }
}

.toolbox {
  &.r {
    margin-left: auto;
    margin-right: 3rem;
  }
  &.l {
    margin-right: auto;
    margin-left: 3rem;
  }
}

.chat-item-leave-active {
  transition: opacity 0.1s ease-in-out;
}
.chat-item-enter-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}
.chat-item-enter {
  opacity: 0;
  transform: translateY(20px);
}
.chat-item-leave-to {
  opacity: 0;
  /* transform: translateY(-20px); */
}
</style>
