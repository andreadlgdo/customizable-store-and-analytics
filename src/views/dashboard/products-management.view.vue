<template>
  <base-text tag="h3">
    {{
      formProduct
        ? itemToEdit
          ? 'Edit'
          : t('dashboard.products.title.form.create')
        : t('dashboard.products.title.list')
    }}
  </base-text>
  <section :class="baseClass">
    <div v-if="!formProduct" :class="`${baseClass}__wrapper ${baseClass}__wrapper--list`">
      <base-button
        @click="addProduct"
        icon="plus"
        :text="t('dashboard.products.action.add')"
        color="primary"
        :class="`${baseClass}__button`"
      />
      <products-table @edit="item => editProduct(item)" />
    </div>
    <div v-else :class="`${baseClass}__wrapper ${baseClass}__wrapper--add`">
      <product-form @action="formProduct = false" :item-to-edit="itemToEdit" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { BaseButton, BaseText, ProductForm, ProductsTable } from '../../components';
  import { Product } from '../../interfaces';

  const { t } = useI18n();

  const baseClass = 'products-management';

  const formProduct = ref(false);

  const itemToEdit = ref<Product | undefined>(undefined);

  const addProduct = () => {
    formProduct.value = true;
    itemToEdit.value = undefined;
  };

  const editProduct = (item: Product) => {
    itemToEdit.value = item;
    formProduct.value = true;
  };
</script>

<style lang="scss" scoped>
  .products-management {
    height: 100%;

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
