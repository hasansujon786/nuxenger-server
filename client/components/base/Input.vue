<template>
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on="inputListeners"
    class="w-full text-base text-gray-600 px-5 h-10 outline-none
      focus:text-gray-900 focus:shadow-outline"
  />
</template>

<script>
export default {
  name: 'baseInput',
  props: ['label', 'value'],
  computed: {
    inputListeners: function() {
      var vm = this
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input: function(event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  }
}
</script>
