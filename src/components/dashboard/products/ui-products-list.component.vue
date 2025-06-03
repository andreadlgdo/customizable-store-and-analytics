<template>
  <div :class="baseClass">
    <UiTable
      @edit="item => $emit('edit', item)"
      @delete="item => $emit('delete', item)"
      :columns="columns"
      :data="
        products.map(p => ({
          ...p,
          stock: p.isUniqueSize
            ? p.uniqueStock
            : p.stock.reduce((acc, stock) => acc + stock.quantity, 0)
        }))
      "
      editable
      removable
    >
      <template v-slot:categories="{ data: categories }">
        <span v-if="categories">
          <BasePill
            v-for="category in categories"
            :key="category"
            :text="category"
            text-size="small"
            color="primary"
          />
        </span>
      </template>
    </UiTable>
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { Product } from '../../../interfaces';

  import UiTable from '../../shared/ui-table.component.vue';

  import BasePill from '../../base-pill.component.vue';

  const { t } = useI18n();

  const baseClass = 'ui-products-list';

  defineProps({
    products: {
      type: Array as PropType<Product[]>,
      required: true
    }
  });
  defineEmits(['edit', 'delete']);

  const columns = computed(() => [
    { id: '_id', label: t('dashboard.products.table.id') },
    { id: 'name', label: t('dashboard.products.table.name') },
    { id: 'categories', label: t('dashboard.products.table.categories') },
    { id: 'price', label: t('dashboard.products.table.price'), textAlign: 'center' },
    { id: 'stock', label: t('dashboard.products.table.stock'), textAlign: 'center' }
  ]);
</script>

<style lang="scss" scoped>
  .ui-products-list {
    height: 82%;
    overflow-y: scroll;
  }
</style>
