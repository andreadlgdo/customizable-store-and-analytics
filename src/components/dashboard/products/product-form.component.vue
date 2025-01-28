<template>
  <div :class="baseClass">
    <img
      :class="`${baseClass}__image`"
      :src="productImage ?? require('../../../assets/media/images/empty.png')"
      alt="userImage"
    />
    <input @change="changeImage" type="file" accept="image/*" />
    <base-text-input
      @input="value => (item.name = value)"
      :label="t('dashboard.products.form.name')"
      :value="item?.name"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-text-input
      @input="value => (item.description = value)"
      :label="t('dashboard.products.form.description')"
      :value="item?.description"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-keywords
      @add="addCategories"
      @remove="removeCategories"
      :values="categories"
      :label="t('dashboard.products.form.categories')"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-text-input
      @input="value => (item.price = Number.parseInt(value))"
      :label="t('dashboard.products.form.price')"
      :value="item?.price.toString()"
      form="semi-round"
      color="white"
      type="outline"
    />
    <base-text-input
      @input="value => (item.quantity = Number.parseInt(value))"
      :label="t('dashboard.products.form.quantity')"
      :value="item?.quantity.toString()"
      form="semi-round"
      color="white"
      type="outline"
    />
  </div>
  <base-button
    @click="save"
    :text="itemToEdit ? 'Edit' : t('dashboard.products.form.action.save')"
    color="primary"
    :class="`${baseClass}__button ${baseClass}__button--save`"
    :disabled="!(item.name && item.price && item.price !== 0)"
  />
  <base-button
    @click="$emit('action')"
    :text="t('dashboard.products.form.action.cancel')"
    color="default"
    :class="`${baseClass}__button ${baseClass}__button--cancel`"
  />
</template>

<script lang="ts" setup>
  import { computed, PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { Product } from '../../../interfaces';
  import { imageService, productService } from '../../../services';

  import { BaseButton, BaseKeywords, BaseTextInput } from '../../inputs';

  const { t } = useI18n();

  const baseClass = 'product-form';

  const props = defineProps({
    itemToEdit: {
      type: Object as PropType<Product>,
      default: undefined
    }
  });

  const emit = defineEmits(['action']);

  const item = ref<Product>(
    props.itemToEdit ?? {
      name: '',
      description: '',
      imageUrl: '',
      categories: [],
      price: 0,
      quantity: 0
    }
  );

  const categories = ref<string[]>(item.value?.categories ?? []);

  const productImage = computed(() =>
    item.value?.imageUrl !== '' ? item.value.imageUrl : undefined
  );

  const addCategories = (query: string) => {
    categories.value.push(query);
  };

  const removeCategories = (query: string) => {
    categories.value = categories.value.filter(category => category !== query);
  };

  const save = async () => {
    if (props.itemToEdit) {
      await productService.updateProduct(item.value);
    } else {
      await productService.createProduct(item.value);
    }
    emit('action');
  };

  const changeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;

    const selectedFile = target.files?.[0];

    if (!selectedFile) {
      alert('Por favor selecciona una imagen primero');
      return;
    } else {
      const formData = new FormData();

      formData.append('image', selectedFile);
      formData.append('routeImage', `products/${item.value._id}`);

      const imageUrl = await imageService.addImage(formData);
      if (imageUrl) {
        item.value.imageUrl = imageUrl;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .product-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 90%;
    overflow: scroll;

    &__image {
      width: 12rem;
      height: 14rem;
      cursor: pointer;
    }

    &__button {
      position: absolute;
      bottom: 0;
      width: 6rem;

      &--cancel {
        left: 7rem;
      }
    }
  }
</style>
