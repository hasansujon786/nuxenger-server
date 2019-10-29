<template functional>
  <div
    class="bg-blue-300 tracking-wide rounded inline-block
     px-4 py-1 font-semibold text-sm shadow"
    :class="props.classNames"
  >
    <slot></slot>
  </div>
</template>
