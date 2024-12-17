<template>
  <div :class="baseClass" v-if="user">
    <div :class="`${baseClass}__aside`">
      <dashboard-menu-aside @clickItem="selectedItem = $event" />
    </div>
    <div :class="`${baseClass}__content`">
      <personal-data v-if="selectedItem.id === 0" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import { DashboardMenuAside, PersonalData } from '../components';
  import { useCurrentUser, useUserMenu } from '../composables';

  const baseClass = 'dashboard';

  const { user } = useCurrentUser();
  const { menuElements } = useUserMenu();

  const selectedItem = ref(menuElements[0]);
</script>

<style lang="scss" scoped>
  .dashboard {
    display: flex;
    justify-content: flex-end;
    background-color: var(--color-border-primary);
    height: 100vh;

    &__content {
      height: 100vh;
      width: calc(100% - 400px);
    }
  }
</style>
