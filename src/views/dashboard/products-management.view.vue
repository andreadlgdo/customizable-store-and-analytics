<template>
  <dashboard :selected-item="menuElements[1]">
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
        <UiSelect
          @change="selectCategory"
          label="Categorias"
          :value="category"
          :options="categories"
          :class="`${baseClass}__select`"
          show-all-option
        />
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
        @delete="deleteProduct"
        :products="products"
      />
      <ui-product-form
        @save="saveItem"
        @cancel="isFormProduct = false"
        v-if="isFormProduct"
        :item-to-edit="itemToEdit"
      />
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  import ProductsList from '../../components/dashboard/products/ui-products-list.component.vue';
  import UiSelect from '../../components/shared/ui-select.component.vue';
  import UiButton from '../../components/shared/ui-button.component.vue';
  import UiProductForm from '../../components/dashboard/products/ui-product-form.component.vue';
  import UiLoading from '../../components/shared/ui-loading.vue';

  import { useCategories, useProducts, useUserMenu } from '../../composables';
  import { Product } from '../../interfaces';
  import { productService } from '../../services';

  import Dashboard from './base-dashboard.view.vue';

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

  const itemToEdit = computed(() =>
    products.value.find((product: Product) => product._id === props.itemId)
  );

  const categories = computed(() => {
    return categoriesList.value?.map(category => ({
      title: category.title,
      disabled: false
    })) ?? [];
  });

  const selectCategory = async (value: string) => {
    category.value = value === 'all by default' ? '' : value;
    isLoading.value = true;
    await loadProducts([category.value]);
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

  const deleteProduct = async (item: Product) => {
    isLoading.value = true;
    await productService.deleteProduct(item._id ?? '');
    await loadProducts();
    isLoading.value = false;
  };

  const saveItem = async () => {
    isFormProduct.value = false;
    await loadProducts();
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
      width: 100%;
      margin: 1rem 0;
    }

    &__select {
      width: 200px;
    }
  }
</style>
