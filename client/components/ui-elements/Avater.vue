<template functional>
  <!-- style="background-image: url(https://randomuser.me/api/portraits/women/33.jpg)" -->
  <a
    :class="props.classNames + ' ' + props.size"
    class="avater bg-gray-400 rounded-full"
    role="button"
    v-bind="data.attrs"
  >
    <div
      v-if="props.img"
      class="w-full h-full bg-no-repeat bg-center bg-contain rounded-full"
      :style="`backgroundImage: url(${props.img})`"
    ></div>
    <div v-else class="default-img w-full h-full bg-no-repeat bg-center"></div>
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
    classNames: String
  }
}
</script>

<style scoped>
.xs {
  width: 32px;
  height: 32px;
  font-size: 13px;
}
.sm {
  width: 36px;
  height: 36px;
}
.md {
  width: 48px;
  height: 48px;
}
.default-img {
  background-image: url('~assets/svg/user.svg');
}
</style>
