<template functional>
  <div
    class="dropdown drop-shadow bg-white shadow-md rounded absolute text-sm z-50"
    :class="props.classNames"
    :style="props.styleProps"
  >
    <div class="dropdown__tail absolute bg-gray-100"></div>
    <ul
      class="dropdown__list-wrapper rounded-b truncate border-b"
      v-for="(drop, dI) in props.dropdown"
      :key="dI"
    >
      <li
        class="border-b ui-text-small bg-gray-100 text-gray-500 px-3 h-6 rounded-t"
        style="line-height: 24px;"
      >
        {{ drop.title }}
      </li>
      <li
        class="dropdown__list-items ui-text-small text-gray-700 py-1 px-3"
        v-for="(option, i) in drop.options"
        @click="listeners['option-click'](option)"
        :key="i"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    styleProps: String,
    classNames: String,
    dropdown: Array
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  min-width: 9rem;

  &__tail {
    /* clip-path: polygon(50% 0%, 0% 100%, 100% 100%); */
    left: 16px;
    top: -7px;
    background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yR/r/IC0Q1OuVif1.png);
    background-repeat: no-repeat;
    background-size: auto;
    background-position: -76px -1082px;
    height: 8px;
    width: 16px;
  }

  &__list-wrapper {
    &:last-child {
      border-bottom-width: 0;
    }
  }

  &__list-items {
    @apply border-dashed;
    cursor: pointer;
    &:hover {
      color: white;
      background-color: var(--primary);
    }
  }
}
</style>
