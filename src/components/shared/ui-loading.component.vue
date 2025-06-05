<template>
  <div :class="baseClass">
    <div :class="`${baseClass}__progress`"></div>
  </div>
</template>

<script setup lang="ts">
const baseClass = 'ui-loading';
</script>

<style lang="scss" scoped>
.ui-loading {
  width: 100%;
  height: 4px;
  background-color: #f0f0f0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  overflow: hidden;

  &__progress {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 30%;
    background-color: var(--color-main);
    animation: loading 1.5s infinite ease-in-out;
  }
}

@keyframes loading {
  0% {
    left: -30%;
  }
  100% {
    left: 100%;
  }
}
</style> 