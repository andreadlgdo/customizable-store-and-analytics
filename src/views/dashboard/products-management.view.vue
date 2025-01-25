<template>
  <base-text tag="h3">{{ isAddingProduct ? 'Añadir producto' : 'Gestión de productos' }}</base-text>
  <section :class="baseClass">
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--list`" v-if="!isAddingProduct">
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
      <base-text-input label="Imagen" form="semi-round" color="white" type="outline" />
      <base-text-input label="Nombre" form="semi-round" color="white" type="outline" />
      <base-text-input label="Descripcion" form="semi-round" color="white" type="outline" />
      <base-keywords
        @add="addCategories"
        @remove="removeCategories"
        label="Categorias"
        form="semi-round"
        :values="categories"
        color="white"
        type="outline"
      />
      <base-text-input label="Precio" form="semi-round" color="white" type="outline" />
      <base-text-input label="Cantidad" form="semi-round" color="white" type="outline" />
      <base-button
        @click="isAddingProduct = false"
        text="Save"
        color="primary"
        :class="`${baseClass}__button ${baseClass}__button--save`"
      />
      <base-button
        @click="isAddingProduct = false"
        text="Cancel"
        color="default"
        :class="`${baseClass}__button ${baseClass}__button--cancel`"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import {
    BaseButton,
    BaseKeywords,
    BaseText,
    BaseTextInput,
    ProductsTable
  } from '../../components';

  const { t } = useI18n();

  const baseClass = 'products-management';

  const isAddingProduct = ref(false);

  const categories = ref<string[]>([]);

  const addCategories = (query: string) => {
    categories.value.push(query);
  };

  const removeCategories = (query: string) => {
    categories.value = categories.value.filter(category => category !== query);
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
