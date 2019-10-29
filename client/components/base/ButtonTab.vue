<template>
  <div class="w-full flex text-gray-800 px-2">
    <button @click="shwoRecent = true" :class="{ active: shwoRecent }" class="btn-tab rounded-l">
      Recent
    </button>
    <button @click="shwoRecent = false" :class="{ active: !shwoRecent }" class="btn-tab rounded-r">
      Active
    </button>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.btn-tab {
  @apply font-bold py-2 m-0 bg-gray-300 w-1/2;

  &:hover,
  &:focus {
    @apply bg-gray-400 outline-none;
  }

  &.active {
    @apply bg-green-300;
  }
}
</style>
