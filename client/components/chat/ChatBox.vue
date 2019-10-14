<template>
  <div
    class="px-4 flex flex-col pb-12 overflow-y-scroll w-full flex-auto bg-no-repeat bg-center bg-cover"
    style="background-image: url(https://raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/Resources/art/bg.jpg)"
  >
    <capsule classNames="mt-3 self-center">End</capsule>
    <transition-group name="chat-item">
      <chat-item v-for="msg in msgs" userId="1" :msg="msg" :key="msg.id" />
    </transition-group>
  </div>
</template>

<script>
import ChatItemVue from './ChatItem.vue'
import CapsuleVue from '../ui-elements/Capsule.vue'
export default {
  props: {
    msgs: Array,
    userId: String
  },
  computed: {},
  components: {
    chatItem: ChatItemVue,
    capsule: CapsuleVue
  }
}
</script>

<style scoped></style>
