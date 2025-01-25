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
        :class="`${baseClass}__button ${baseClass}__button--add`"
      />
      <products-table @edit="item => editProduct(item)" />
    </div>
    <div v-else :class="`${baseClass}__wrapper ${baseClass}__wrapper--add`">
      <product-form :item-to-edit="itemToEdit" />
      <base-button
        @click="formProduct = false"
        :text="itemToEdit ? 'Edit' : t('dashboard.products.form.action.save')"
        color="primary"
        :class="`${baseClass}__button ${baseClass}__button--save`"
      />
      <base-button
        @click="formProduct = false"
        :text="t('dashboard.products.form.action.cancel')"
        color="default"
        :class="`${baseClass}__button ${baseClass}__button--cancel`"
      />
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

      &--add {
        align-self: flex-end;
      }

      &--save,
      &--cancel {
        position: absolute;
        bottom: 0;
        width: 6rem;
      }

      &--cancel {
        left: 7rem;
      }
    }
  }
</style>
