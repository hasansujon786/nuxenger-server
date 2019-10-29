<template functional>
  <!-- style="background-image: url(https://randomuser.me/api/portraits/women/33.jpg)" -->
  <a
    :class="props.classNames + ' ' + props.size"
    class="avater bg-gray-400 rounded-full text-black truncate text-lg inline-block"
    role="button"
    v-bind="data.attrs"
  >
    <div
      v-if="props.img"
      class="bg-no-repeat bg-center bg-contain"
      :style="`backgroundImage: url(${props.img})`"
    ></div>

    <div :title="props.name" v-else-if="props.name" class="flex justify-center items-center">
      {{ props.name.charAt(0) }}
    </div>

    <div v-else class="default-img bg-no-repeat bg-center"></div>
  </a>
</template>

<script>
export default {
  props: {
    img: {
      type: String
    },
    size: {
      type: String,
      default: 'md'
    },
    classNames: String,
    name: String
  }
}
</script>

<style lang="scss" scoped>
.avater {
  &.xs {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  &.sm {
    width: 36px;
    height: 36px;
  }
  &.md {
    width: 48px;
    height: 48px;
  }

  div {
    width: 100%;
    height: 100%;
  }

  .default-img {
    background-image: url('~assets/svg/user.svg');
  }
}
</style>
