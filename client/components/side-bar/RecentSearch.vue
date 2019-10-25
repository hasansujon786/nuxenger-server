<template>
  <div class="w-full">
    <ui-input
      v-model="search"
      classNames="mt-3 rounded-full bg-gray-200"
      type="search"
      required
      placeholder="Search people..."
    />
  </div>
</template>

<script>
import InputVue from '../ui-elements/Input.vue'
export default {
  data() {
    return {
      search: ''
    }
  },
  components: {
    uiInput: InputVue
  }
}
</script>

<style></style>
