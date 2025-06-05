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

  import { useUsers } from '../../../composables';
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
  const { user } = useUsers();

  const columns = computed(() => {
    const baseColumns = [
      { id: '_id', label: t('dashboard.orders.table.id') },
      { id: 'units', label: t('dashboard.orders.table.products'), textAlign: 'center', sortable: true },
      { id: 'total', label: t('dashboard.orders.table.total'), textAlign: 'center'},
      { id: 'status', label: t('dashboard.orders.table.status'), textAlign: 'center' }
    ];

    if (user.value && user.value.type === 'admin') {
      baseColumns.splice(1, 0, { id: 'userId', label: t('dashboard.orders.table.idUser') });
    }

    return baseColumns;
  });

</script>

<style lang="scss" scoped>
  .ui-orders-list {
    height: 72vh;
    overflow-y: scroll;
  }
</style>
