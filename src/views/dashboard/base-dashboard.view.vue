<template>
  <div :class="baseClass">
    <ui-dashboard-menu :selected-item="selectedItem" />
    <slot>
      <p>{{ selectedItem.label }}</p>
    </slot>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import UiDashboardMenu from '../../components/dashboard/ui-dashboard-menu.component.vue';

  import { MenuItem } from '../../interfaces';

  const baseClass = 'dashboard';

  defineProps({
    selectedItem: {
      type: Object as PropType<MenuItem | undefined>,
      required: true
    }
  });
</script>

<style lang="scss" scoped>
  .dashboard {
    display: flex;
    height: 100%;
    background-color: var(--color-soft-primary);
  }
</style>
