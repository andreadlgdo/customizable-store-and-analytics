<template>
  <div :class="baseClass">
    <base-button
      icon="plus"
      :text="t('dashboard.products.action.add')"
      color="primary"
      :class="`${baseClass}__button`"
    />
    <div :class="`${baseClass}__table`">
      <base-table :columns="columns" :data="products">
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
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useProducts } from '../../composables';

  import BasePill from '../base-pill.component.vue';
  import BaseTable from '../base-table.component.vue';
  import { BaseButton } from '../inputs';

  const { t } = useI18n();
  const { loadProducts, products } = useProducts();

  const baseClass = 'products-table';

  const columns = computed(() => [
    { id: '_id', label: t('dashboard.products.table.id') },
    { id: 'name', label: t('dashboard.products.table.name') },
    { id: 'categories', label: t('dashboard.products.table.categories') },
    { id: 'price', label: t('dashboard.products.table.price'), textAlign: 'center' },
    { id: 'price', label: t('dashboard.products.table.stock'), textAlign: 'center' }
  ]);

  onMounted(async () => await loadProducts());
</script>

<style lang="scss" scoped>
  .products-table {
    display: flex;
    flex-direction: column;

    &__button {
      align-self: flex-end;
      margin-bottom: 1rem;
    }

    &__table {
      height: 72vh;
      overflow-y: scroll;
    }
  }
</style>
