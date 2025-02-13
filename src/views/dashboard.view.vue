<template>
  <div :class="baseClass">
    <ui-menu :selected-item="selectedItem" />
    <slot>
      <p>{{ selectedItem ? selectedItem?.label : 'undefined' }}</p>
    </slot>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import UiMenu from '../components/dashboard-menu/ui-menu.component.vue';

  import { MenuItem } from '../interfaces';

  const baseClass = 'dashboard';

  defineProps({
    selectedItem: {
      type: Object as PropType<MenuItem | undefined>,
      default: undefined
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
