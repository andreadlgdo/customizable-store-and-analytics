<template>
  <header-layout />
  <div :class="baseClass">
    DASHBOARD
  </div>
</template>

<script lang="ts" setup>
  import HeaderLayout from './header-layout.view.vue';

  const baseClass = 'dashboard';
</script>

<style lang="scss" scoped>
  .dashboard {
  }
</style>
