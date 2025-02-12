<template>
  <old-dashboard :class="baseClass" index="1">
    <base-text tag="h3">
      {{
        formProduct
          ? itemToEdit
            ? t('dashboard.products.title.form.edit')
            : t('dashboard.products.title.form.create')
          : t('dashboard.products.title.list')
      }}
    </base-text>
    <section :class="`${baseClass}__section`">
      <div v-if="!formProduct" :class="`${baseClass}__wrapper ${baseClass}__wrapper--list`">
        <base-button
          @click="addProduct"
          icon="plus"
          :text="t('dashboard.products.action.add')"
          color="primary"
          :class="`${baseClass}__button`"
        />
        <products-table
          @delete="item => deleteProduct(item)"
          @edit="item => editProduct(item)"
          :products="products"
        />
      </div>
      <div v-else :class="`${baseClass}__wrapper ${baseClass}__wrapper--add`">
        <product-form @action="closeForm" :item-to-edit="itemToEdit" />
      </div>
    </section>
  </old-dashboard>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  import { BaseButton, BaseText, ProductForm, ProductsTable } from '../../components';
  import { useProducts } from '../../composables';
  import { Product } from '../../interfaces';
  import { imageService, productService } from '../../services';

  import OldDashboard from '../old-dashboard.view.vue';

  const { t } = useI18n();
  const router = useRouter();

  const { loadProducts, products } = useProducts();

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

  const formProduct = ref(!!props.action && !props.itemId);

  const itemToEdit = ref<Product | undefined>(undefined);

  const addProduct = () => {
    formProduct.value = true;
    itemToEdit.value = undefined;
    router.push({
      name: 'ProductsDashboard',
      params: { action: 'add' }
    });
  };

  const editProduct = (item: Product) => {
    itemToEdit.value = item;
    formProduct.value = true;
    router.push({
      name: 'ProductsDashboard',
      params: { action: 'edit', itemId: item._id }
    });
  };

  const deleteProduct = async (item: Product) => {
    if (item.imageUrl && item._id) {
      await imageService.deleteImage('products', item._id);
    }
    await productService.deleteProduct(item._id ?? '');
    await loadProducts();
  };

  const closeForm = async () => {
    await router.push({
      name: 'ProductsDashboard'
    });
    formProduct.value = false;
    window.location.reload();
  };

  watch(
    () => props.itemId,
    async () => {
      await loadProducts();
      formProduct.value = !!props.action;
      itemToEdit.value = props.itemId
        ? products.value.find((product: Product) => product._id === props.itemId)
        : undefined;
    },
    { immediate: true }
  );

  onMounted(async () => {
    await loadProducts();
  });
</script>

<style lang="scss" scoped>
  .products-management {
    position: relative;

    &__section {
      height: 100%;
      overflow: hidden;
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;

      &--add {
        position: relative;
        gap: 1rem;
      }
    }

    &__button {
      margin-bottom: 1rem;
      align-self: flex-end;
    }
  }
</style>
