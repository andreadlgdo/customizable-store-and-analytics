<template>
  <dashboard :selected-item="menuElements[3]">
    <div :class="baseClass">
      <h1>
        {{
          isFormProduct
            ? itemId
              ? t('dashboard.products.title.form.edit')
              : t('dashboard.products.title.form.create')
            : t('dashboard.products.title.list')
        }}
      </h1>
      <div v-if="!isFormProduct" :class="`${baseClass}__header`">
        <div :class="`${baseClass}__filters`">
          <UiSearch
            :value="query"
            placeholder="Buscar por nombre"
            @search="searchProduct"
            :class="`${baseClass}__search`"
          />
          <UiSelect
            @change="selectCategory"
            label="Categorias"
            :value="category"
            :options="categories"
            :class="`${baseClass}__select`"
            show-all-option
          />
          <UiSelect 
           @change="selectHasStock"
            label="Stock"
            :value="hasStock"
            :options="[{ title: 'Con stock', value: 'true'}, { title: 'Sin stock', value: 'false'}]"
            show-all-option
             :class="`${baseClass}__select`"
          />
          <p @click="resetFilters" :class="`${baseClass}__text`">Reset filters</p>
        </div>
        <ui-button
          @click="addProduct"
          :text="t('dashboard.products.action.add')"
          icon="plus"
        />
      </div>

      <ui-loading v-if="isLoading" />
      <products-list
        v-else-if="!isFormProduct"
        @edit="editProduct"
        @delete="confirmDeleteProduct"
        :products="products"
      />
      <ui-product-form
        @save="saveItem"
        @cancel="isFormProduct = false"
        v-if="isFormProduct"
        :item-to-edit="itemToEdit"
      />
      <ui-modal @close="showDeleteModal = false" :is-open="showDeleteModal">
        <div :class="`${baseClass}__modal`">
          <p :class="`${baseClass}__text ${baseClass}__text--title`">¿Estás seguro de que quieres eliminar este producto?</p>
          <p :class="`${baseClass}__text ${baseClass}__text--warning`">Esta acción no se puede deshacer.</p>
          <div :class="`${baseClass}__actions`">
            <ui-button text="Confirmar" @click="deleteProduct" />
            <ui-button text="Cancelar" @click="showDeleteModal = false" transparent />
          </div>
        </div>
      </ui-modal>
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

// Components
import Dashboard from './base-dashboard.view.vue';
import ProductsList from '../../components/dashboard/products/ui-products-list.component.vue';
import UiSearch from '../../components/shared/ui-search.component.vue';
import UiSelect from '../../components/shared/ui-select.component.vue';
import UiButton from '../../components/shared/ui-button.component.vue';
import UiProductForm from '../../components/dashboard/products/ui-product-form.component.vue';
import UiLoading from '../../components/shared/ui-loading.component.vue';
import UiModal from '../../components/shared/ui-modal.component.vue';

import { useCategories, useProducts, useUserMenu } from '../../composables';

import { Product } from '../../interfaces';

import { productService } from '../../services';

const router = useRouter();
const { t } = useI18n();
const { menuElements } = useUserMenu();
const { loadProducts, products } = useProducts();
const { categories: categoriesList, loadCategories } = useCategories();

const baseClass = 'products-management';

const props = defineProps({
  action: {
    type: String,
    default: undefined
  },
  itemId: {
    type: String,
    default: undefined
  }
});

const isLoading = ref(false);
const isFormProduct = ref(!!props.action && !props.itemId);
const category = ref<string>('');
const hasStock = ref<string>('');
const query = ref<string>('');

const showDeleteModal = ref(false);
const productToDelete = ref<Product | null>(null);

const itemToEdit = computed(() =>
  products.value.find((product: Product) => product._id === props.itemId)
);

const categories = computed(() => {
  return categoriesList.value?.map(category => ({
    title: category.title,
    disabled: false
  })) ?? [];
});

const searchProduct = async (value: string) => {
  query.value = value;
  await loadProducts({ categories: [category.value], name: query.value, hasStock: hasStock.value });
};

const selectCategory = async (value: string) => {
  category.value = value === 'all by default' ? '' : value;
  isLoading.value = true;
  await loadProducts({ categories: [category.value], name: query.value, hasStock: hasStock.value });
  isLoading.value = false;
};

const selectHasStock = async (value: string) => {
  hasStock.value = value === 'all by default' ? '' : value;
  isLoading.value = true;
  await loadProducts({ categories: [category.value], name: query.value, hasStock: hasStock.value });
  isLoading.value = false;
};

const resetFilters = async () => {
  isLoading.value = true;
  category.value = '';
  hasStock.value = '';
  query.value = '';
  await loadProducts();
  isLoading.value = false;
};

const addProduct = () => {
  isFormProduct.value = true;
  router.push({
    name: 'ProductsManagement',
    params: { action: 'add' }
  });
};

const editProduct = (item: Product) => {
  isFormProduct.value = true;
  router.push({
    name: 'ProductsManagement',
    params: { action: 'edit', itemId: item._id }
  });
};

const confirmDeleteProduct = (item: Product) => {
  productToDelete.value = item;
  showDeleteModal.value = true;
};

const deleteProduct = async () => {
  if (!productToDelete.value) return;
  isLoading.value = true;
  await productService.deleteProduct(productToDelete.value._id ?? '');
  await loadProducts({ categories: [category.value], name: query.value, hasStock: hasStock.value });
  isLoading.value = false;
  showDeleteModal.value = false;
  productToDelete.value = null;
};

const saveItem = async () => {
  isFormProduct.value = false;
  await loadProducts({ categories: [category.value], name: query.value, hasStock: hasStock.value });
};

watch(
  () => [props.action, props.itemId],
  () => {
    if (!props.action && !props.itemId) {
      isFormProduct.value = false;
    }
  },
  { immediate: true }
);

onMounted(async () => {
  isLoading.value = true;
  await loadProducts();
  await loadCategories();
  isLoading.value = false;
});
</script>

<style lang="scss" scoped>
.products-management {
  display: flex;
  flex-direction: column;
  margin: 2rem;
  width: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    margin: 1rem 0 2rem 0;
  }

  &__filters {
    display: flex;
    align-items: flex-end;
    gap: 18px;
  }

  &__search {
    width: 300px;
  }

  &__select {
    width: 170px;
  }

  &__text {
    margin-bottom: 12px;
    cursor: pointer;

    &:hover {
      font-weight: bold;
    }

    &--title { 
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    &--warning {  
      color: #555;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }

  &__modal {
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }

  &__actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    width: 100%;
  }
}
</style>
