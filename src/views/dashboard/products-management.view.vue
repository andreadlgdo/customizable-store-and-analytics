<template>
  <dashboard :class="baseClass" index="1">
    <base-text tag="h3">
      {{
        formProduct
          ? itemToEdit
            ? 'Edit'
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
        <products-table @edit="item => editProduct(item)" />
      </div>
      <div v-else :class="`${baseClass}__wrapper ${baseClass}__wrapper--add`">
        <product-form @action="formProduct = false" :item-to-edit="itemToEdit" />
      </div>
    </section>
  </dashboard>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  import { BaseButton, BaseText, ProductForm, ProductsTable } from '../../components';
  import { Product } from '../../interfaces';

  import Dashboard from '../dashboard.view.vue';

  const { t } = useI18n();
  const router = useRouter();

  const baseClass = 'products-management';

  const props = defineProps({
    action: {
      type: String,
      default: undefined
    }
  });

  const formProduct = ref(!!props.action);

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
      params: { action: 'edit' }
    });
  };
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
