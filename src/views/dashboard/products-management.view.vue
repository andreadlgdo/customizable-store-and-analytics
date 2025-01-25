<template>
  <base-text tag="h3">
    {{
      isAddingProduct
        ? t('dashboard.products.title.form.create')
        : t('dashboard.products.title.list')
    }}
  </base-text>
  <section :class="baseClass">
    <div v-if="!isAddingProduct" :class="`${baseClass}__wrapper ${baseClass}__wrapper--list`">
      <base-button
        @click="isAddingProduct = true"
        icon="plus"
        :text="t('dashboard.products.action.add')"
        color="primary"
        :class="`${baseClass}__button ${baseClass}__button--add`"
      />
      <products-table />
    </div>
    <div v-else :class="`${baseClass}__wrapper ${baseClass}__wrapper--add`">
      <product-form />
      <base-button
        @click="isAddingProduct = false"
        :text="t('dashboard.products.form.action.save')"
        color="primary"
        :class="`${baseClass}__button ${baseClass}__button--save`"
      />
      <base-button
        @click="isAddingProduct = false"
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

  const { t } = useI18n();

  const baseClass = 'products-management';

  const isAddingProduct = ref(false);
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
