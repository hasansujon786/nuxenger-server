<template functional>
  <label :class="props.classNames" class="ui-select inline-flex cursor-pointer relative">
    <slot></slot>
    <div
      class="ui-select__bg w-5 h-5 bg-white rounded
      bg-center bg-contain bg-no-repeat border border-gray-400"
    ></div>
    <span v-if="props.label" class="select-none ml-2">{{ props.label }}</span>
  </label>
</template>

<script>
export default {
  props: {
    classNames: String,
    label: String
  }
}
</script>

<style lang="scss" scoped>
.ui-select {
  input[type='checkbox']:checked + .ui-select__bg {
    background-image: url('~assets/svg/check-white.svg');
    background-color: #3182ce !important;
    border-color: #3182ce !important;
    box-shadow: 0 0 0 4px rgba(49, 130, 206, 0.3);
  }
}

.user-is-tabbing {
  input[type='checkbox']:focus + .ui-select__bg {
    @apply shadow-outline;
  }
}
/* Keep it in global Style file */
.ui-select input[type='checkbox'] {
  all: initial;
  opacity: 0;
}
</style>
