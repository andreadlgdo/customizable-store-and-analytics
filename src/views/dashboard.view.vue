<template>
  <div :class="baseClass">
    <ui-menu @updateSelectedItem="item => (selectedItem = item)" :selected-item="selectedItem" />
    <p>{{ selectedItem.label }}</p>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import UiMenu from '../components/dashboard-menu/ui-menu.component.vue';

  import { useUserMenu } from '../composables';

  const baseClass = 'dashboard';

  const { menuElements } = useUserMenu();

  const selectedItem = ref(menuElements[0]);
</script>

<style lang="scss" scoped>
  .dashboard {
    display: flex;
    height: 100%;
  }
</style>
