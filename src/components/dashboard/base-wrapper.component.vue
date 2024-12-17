<template>
  <div :class="baseClass"><slot /></div>
</template>

<script lang="ts" setup>
  const baseClass = 'base-wrapper';
</script>

<style lang="scss" scoped>
  .base-wrapper {
    width: auto;
    margin: 18px;
    padding: 2rem;
    border-radius: 50px;
    background-color: var(--color-white);
    box-shadow: var(--shadow-aside);
  }
</style>
