<template>
  <button
    class="Button cursor-pointer px-5 h-10 bg-blue-600 
    hover:bg-blue-500 inline-block text-blue-100 
    hover:text-white rounded-full"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot>I'm a button</slot>
  </button>
</template>

<script>
export default {
  name: 'baseButton'
}
</script>

<style lang="scss">
.Button {
  &:active {
    @apply bg-blue-600;
  }
}
</style>
