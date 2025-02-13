<template>
  <div :class="baseClass">
    <ui-menu />
    <p>Dashboard</p>
  </div>
</template>

<script lang="ts" setup>
  import UiMenu from '../components/dashboard-menu/ui-menu.component.vue';

  const baseClass = 'dashboard';
</script>

<style lang="scss" scoped>
  .dashboard {
    display: flex;
    height: 100%;
  }
</style>
