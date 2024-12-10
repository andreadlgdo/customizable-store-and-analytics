<template>
  <div :class="baseClass" v-if="user">
    <div :class="`${baseClass}__aside`">
      <dashboard-menu-aside @clickItem="selectedItem = $event" />
    </div>
    <div :class="`${baseClass}__content`">{{ selectedItem }}</div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import { DashboardMenuAside } from '../components';
  import { useCurrentUser } from '../composables';

  const baseClass = 'dashboard';

  const { user } = useCurrentUser();

  const selectedItem = ref();
</script>

<style lang="scss" scoped>
  .dashboard {
    display: flex;
    background-color: var(--color-border-primary);
    height: 100vh;

    &__content {
      width: 600px;
      height: 120vh;
      background-color: white;
    }
  }
</style>
