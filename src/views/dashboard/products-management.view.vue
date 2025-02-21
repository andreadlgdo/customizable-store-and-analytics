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
      <ui-button
        v-if="!isFormProduct"
        @click="addProduct"
        :text="t('dashboard.products.action.add')"
        icon="plus"
        :class="`${baseClass}__button`"
      />
      <products-list
        @edit="editProduct"
        @delete="deleteProduct"
        v-if="!isFormProduct"
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

  import ProductsList from '../../components/dashboard-menu/ui-products-list.component.vue';
  import UiButton from '../../components/shared/ui-button.component.vue';
  import UiProductForm from '../../components/dashboard-menu/ui-product-form.component.vue';

  import { useProducts, useUserMenu } from '../../composables';
  import { Product } from '../../interfaces';
  import { productService } from '../../services';

  import Dashboard from './dashboard.view.vue';

  const { menuElements } = useUserMenu();
  const { loadProducts, products } = useProducts();

  const router = useRouter();

  const { t } = useI18n();

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

  const isFormProduct = ref(!!props.action && !props.itemId);

  const itemToEdit = computed(() =>
    products.value.find((product: Product) => product._id === props.itemId)
  );

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
    await productService.deleteProduct(item._id ?? '');
    await loadProducts();
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

  onMounted(async () => await loadProducts());
</script>

<style lang="scss" scoped>
  .products-management {
    display: flex;
    flex-direction: column;
    margin: 2rem;
    width: 100%;

    &__button {
      align-self: flex-end;
      width: fit-content;
      margin: 1rem 0;
    }
  }
</style>
