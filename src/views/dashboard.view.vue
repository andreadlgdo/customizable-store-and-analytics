<template>
  <div :class="baseClass">
    <ui-aside
      @click="isCollapsed = !isCollapsed"
      icon="menu"
      :is-collapsed="isCollapsed"
      is-open
    ></ui-aside>
    <p>Dashboard</p>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import UiAside from '../components/shared/ui-aside.component.vue';

  const baseClass = 'dashboard';

  const isCollapsed = ref(false);
</script>

<style lang="scss" scoped>
  .dashboard {
    display: flex;
    height: 100%;
  }
</style>
