<template>
  <div
    class="px-4 flex flex-col overflow-y-scroll w-full flex-auto bg-no-repeat bg-center bg-cover"
  >
    <!-- style="background-image: url(https://raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/Resources/art/bg.jpg)" -->
    <capsule classNames="mt-3 self-center">End</capsule>
    <transition-group mode="out-in" name="chat-item">
      <chat-item
        v-for="msg in msgs"
        :currentUserId="$store.getters['auth/authUser'].id"
        :key="msg.id"
        :msg="msg"
      />
    </transition-group>
    <div id="chatboxBtm" class="pb-12"></div>
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
  components: {
    chatItem: ChatItemVue,
    capsule: CapsuleVue
  }
}
</script>

<style scoped></style>
