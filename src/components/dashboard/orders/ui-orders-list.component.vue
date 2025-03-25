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
  import { useI18n } from 'vue-i18n';

  const baseClass = 'ui-orders-list';

  defineProps({
    orders: {
      type: Array as PropType<Order[]>,
      required: true
    }
  });

  defineEmits(['seeDetails']);

  const { t } = useI18n();

  const columns = computed(() => [
    { id: '_id', label: t('dashboard.orders.table.id') },
    { id: 'userId', label: t('dashboard.orders.table.idUser') },
    { id: 'units', label: t('dashboard.orders.table.products'), textAlign: 'center' },
    { id: 'total', label: t('dashboard.orders.table.total'), textAlign: 'center' },
    { id: 'status', label: t('dashboard.orders.table.status'), textAlign: 'center' }
  ]);
</script>

<style lang="scss" scoped>
  .ui-orders-list {
    height: 72vh;
    overflow-y: scroll;
  }
</style>
