<template>
  <div :class="baseClass" v-if="user">
    <dashboard-menu-aside />
  </div>
</template>

<script lang="ts" setup>
  import { DashboardMenuAside } from '../components';
  import { useCurrentUser } from '../composables';

  const baseClass = 'dashboard';

  const { user } = useCurrentUser();
</script>

<style lang="scss" scoped>
  .dashboard {
    background-color: var(--color-border-primary);
    height: 100vh;
  }
</style>
