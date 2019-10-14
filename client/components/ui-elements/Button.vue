<template functional>
  <button
    class="Button cursor-pointer px-5 h-10 bg-blue-600 hover:bg-blue-500 shadow-xl inline-block text-blue-100 hover:text-white rounded-full"
    v-bind="data.$attrs"
    v-on="listeners"
    :class="props.classNames"
  >
    <slot>Primary</slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: ['classNames']
}
</script>

<style lang="scss">
.Button {
  &:active {
    @apply bg-blue-600;
  }
}
</style>
