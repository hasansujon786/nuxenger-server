<template>
  <div class="input-bg z-10 flex items-center content-center w-full text-xl p-3 ">
    <form @submit.prevent="handleSubmit" class="flex flex-auto">
      <input
        ref="msgInput"
        type="text"
        class="w-full px-5 py-3 text-black text-base rounded-full bg-gray-300 focus:outline-none"
        placeholder="Write a message..."
        v-model="inputText"
      />
      <button type="submit" tabindex="0" class="p-2 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="2 -2 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-send"
          transform="rotate(45)"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: ''
    }
  },
  methods: {
    handleSubmit() {
      if (!this.inputText) return
      this.$emit('on-submit', this.inputText)
      this.inputText = ''
    }
  },
  mounted() {
    function focusOnInput(e) {
      if (e.key !== '/') return
      this.$refs.msgInput.focus()
    }
    window.addEventListener('keyup', focusOnInput)
  }
}
</script>

<style scoped>
input:not(:placeholder-shown) + button {
  color: #000;
}
.input-bg {
  box-shadow: 0 -20px 25px -20px rgba(0, 0, 0, 0.5), 0 -20px 10px -5px rgba(0, 0, 0, 0.08);
}
</style>
