<template functional>
  <!-- style="background-image: url(https://randomuser.me/api/portraits/women/33.jpg)" -->
  <a :class="props.classNames + ' ' + props.size" class="avater" role="button" v-bind="data.attrs">
    <div
      class="w-full h-full bg-gray-500 flex-center bg-no-repeat bg-center bg-contain rounded-full"
      :style="`backgroundImage: url(${props.img})`"
    >
      {{ props.img ? '' : props.name.charAt(0).toUpperCase() }}
    </div>
  </a>
</template>

<script>
export default {
  props: {
    img: String,
    size: {
      type: String,
      default: 'md'
    },
    name: {
      type: String,
      default: 'Nelson'
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
  width: 38px;
  height: 38px;
}
.md {
  width: 48px;
  height: 48px;
}
</style>
