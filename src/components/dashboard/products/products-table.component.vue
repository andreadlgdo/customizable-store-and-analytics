<template>
  <div :class="baseClass">
    <base-table
      @edit="item => $emit('edit', item)"
      @delete="item => $emit('delete', item)"
      :columns="columns"
      :data="products"
      editable
      removable
    >
      <template v-slot:categories="{ data: categories }">
        <span v-if="categories">
          <base-pill
            v-for="category in categories"
            :key="category"
            :text="category"
            text-size="small"
            color="primary"
          />
        </span>
      </template>
    </base-table>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useProducts } from '../../../composables';

  import BasePill from '../../base-pill.component.vue';
  import BaseTable from '../../base-table.component.vue';

  const { t } = useI18n();
  const { loadProducts, products } = useProducts();

  const baseClass = 'products-table';

  defineEmits(['edit', 'delete']);

  const columns = computed(() => [
    { id: '_id', label: t('dashboard.products.table.id') },
    { id: 'name', label: t('dashboard.products.table.name') },
    { id: 'categories', label: t('dashboard.products.table.categories') },
    { id: 'price', label: t('dashboard.products.table.price'), textAlign: 'center' },
    { id: 'quantity', label: t('dashboard.products.table.stock'), textAlign: 'center' }
  ]);

  onMounted(async () => await loadProducts());
</script>

<style lang="scss" scoped>
  .products-table {
    height: 72vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>
