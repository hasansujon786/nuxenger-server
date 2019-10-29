<template>
  <div class="mt-3 flex flex-col">
    <div class="chatItem-row flex border-purple-300" :class="isUser ? 'r' : 'l'">
      <div class="avater-wrapper" :class="{ r: isUser, l: !isUser }">
        <avater :name="msg.sender.name" size="xs" classNames="-mt-2" />
      </div>
      <chat-bubble :tail="isUser ? 'r' : 'l'">{{ msg.body }}</chat-bubble>

      <div
        class="date-wrapper opacity-0  flex items-center p-2 font-medium text-gray-500 text-xs hover:opacity-100"
      >
        <span class="">{{ useTime(msg.createdAt) }}</span>
      </div>
    </div>

    <div
      class="toolbox-row flex mt-1 text-gray-500 hover:opacity-100 text-xs font-medium"
      :class="{ r: isUser, l: !isUser }"
    >
      <span class="toolbox-row__name capitalize">{{ useFirstName(msg.sender.name) }}</span>
    </div>
  </div>
</template>

<script>
import { textModification } from '../../mixins'
import ChatBubble from './ChatBubble.vue'
import Avater from '@/components/base/Avater.vue'
export default {
  computed: {
    isUser() {
      return this.currentUserId === this.msg.sender.id
    }
  },
  props: ['msg', 'currentUserId'],

  methods: {},
  mixins: [textModification],
  components: {
    chatBubble: ChatBubble,
    avater: Avater
  }
}
</script>

<style lang="scss" scoped>
.chatItem-row {
  &.r {
    align-self: flex-end;
    .date-wrapper {
      order: -1;
    }
  }
  &.l {
    align-self: flex-start;
  }

  &:hover + .toolbox-row {
    opacity: 1;
  }
  &:hover .date-wrapper {
    opacity: 1;
  }
}

.avater-wrapper {
  &.r {
    order: 2;
  }
  &.l {
    order: 0;
  }
}

.toolbox-row {
  --pad: 3.2rem;

  &.r {
    align-self: flex-end;
    padding-right: var(--pad);
    .toolbox-row__name {
      opacity: 0;
    }
  }

  &.l {
    align-self: flex-start;
    padding-left: var(--pad);
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
