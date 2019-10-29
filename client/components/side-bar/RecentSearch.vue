<template>
  <div class="w-full">
    <base-input
      v-model="search"
      class="mt-3 rounded-full bg-gray-200"
      type="search"
      required
      placeholder="Search people..."
    />
  </div>
</template>

<script>
import InputVue from '../base/Input.vue'

export default {
  data() {
    return {
      search: ''
    }
  },
  components: {
    baseInput: InputVue
  }
}
</script>

<style></style>
