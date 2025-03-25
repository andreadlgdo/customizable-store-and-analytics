<template>
  <div :class="baseClass">
    <UiTable
      @seeDetails="item => $emit('seeDetails', item)"
      :columns="columns"
      :data="orders.map(o => ({ ...o, units: o.products.length, total: o.total + ' €' }))"
      details
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType } from 'vue';

  import { Order } from '../../../interfaces';

  import UiTable from '../../shared/ui-table.component.vue';

  const baseClass = 'ui-orders-list';

  defineProps({
    orders: {
      type: Array as PropType<Order[]>,
      required: true
    }
  });

  defineEmits(['seeDetails']);

  const columns = computed(() => [
    { id: '_id', label: 'ID' },
    { id: 'userId', label: 'ID usuario' },
    { id: 'units', label: 'Productos', textAlign: 'center' },
    { id: 'total', label: 'Total', textAlign: 'center' },
    { id: 'status', label: 'Status', textAlign: 'center' }
  ]);
</script>

<style lang="scss" scoped>
  .ui-orders-list {
    height: 72vh;
    overflow-y: scroll;
  }
</style>
