<template functional>
  <input
    v-bind="data.attrs"
    @input="listeners['input']($event.target.value)"
    :class="props.classNames"
    class="w-full text-base text-gray-600 px-5 h-10
    outline-none focus:text-gray-900 focus:shadow-outline"
  />
</template>
