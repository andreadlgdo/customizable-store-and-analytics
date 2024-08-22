<template>
  <div :class="baseClass"></div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const baseClass = ref('product-card-whist-list');
</script>

<style lang="scss" scoped>
  .product-card-whist-list {
  }
</style>
