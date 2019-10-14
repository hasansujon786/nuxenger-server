<template functional>
  <div :class="props.tail" class="holder relative shadow-md rounded-lg text-sm py-3 px-5 ">
    <div :class="props.tail" class="tail shadow-md absolute top-0"></div>
    <p class="para">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    tail: String
  }
}
</script>

<style lang="scss" scoped>
.holder {
  min-height: 45px;
  max-width: 30rem;
  --l-sede-bg: hsl(204, 45%, 80%);
  --l-sede-text: black;

  --r-sede-bg: hsl(143, 40%, 40%);
  --r-sede-text: white;
  &.r {
    background-color: var(--r-sede-bg);
    color: var(--r-sede-text);

    margin-left: auto; // TODO: reusability
    margin-right: 0.8rem;
  }
  &.l {
    background-color: var(--l-sede-bg);
    color: var(--l-sede-text);

    margin-right: auto; // TODO: reusability
    margin-left: 0.8rem;
  }
}

.tail {
  width: 25px;
  height: 32px;

  &.r {
    clip-path: polygon(0 0, 0% 100%, 100% 0);
    right: -10px;
    background-color: var(--r-sede-bg);
  }

  &.l {
    clip-path: polygon(0 0, 100% 100%, 100% 0);
    left: -10px;
    background-color: var(--l-sede-bg);
  }
}

.para {
  word-wrap: break-word;
}
</style>
