<template functional>
  <input
    v-bind="data.attrs"
    @input="listeners['input']($event.target.value)"
    :class="props.classNames"
    class="w-full bg-gray-100 text-base text-gray-600 border rounded px-5 h-10
    rounded-full outline-none focus:text-gray-900 focus:shadow-outline"
  />
</template>
