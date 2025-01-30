<template>
  <div :class="baseClass">
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--image`">
      <img
        v-if="!loading"
        :src="productImage ?? require('../../../assets/media/images/empty.png')"
        alt="Product image"
        :class="`${baseClass}__image`"
      />
      <input @change="changeImage" type="file" accept="image/*" />
    </div>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--content`">
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
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--number`">
        <base-text-input
          @input="value => (item.price = value)"
          :label="t('dashboard.products.form.price')"
          :value="item?.price"
          :removable="false"
          tag="number"
          form="semi-round"
          color="white"
          type="outline"
          :class="`${baseClass}__input ${baseClass}__input--number`"
        />
        <base-text-input
          @input="value => (item.quantity = value)"
          :label="t('dashboard.products.form.quantity')"
          :value="item?.quantity"
          :removable="false"
          tag="number"
          form="semi-round"
          color="white"
          type="outline"
          :class="`${baseClass}__input ${baseClass}__input--number`"
        />
      </div>
    </div>
  </div>
  <base-button
    @click="save"
    :text="itemToEdit ? 'Edit' : t('dashboard.products.form.action.save')"
    color="primary"
    :class="`${baseClass}__button ${baseClass}__button--save`"
    :disabled="!(item.name && item.price && item.price !== 0)"
  />
  <base-button
    @click="cancel"
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
  const loading = ref(false);

  const productImage = computed(() =>
    item.value?.imageUrl !== '' ? item.value?.imageUrl : undefined
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
      const newProduct = await productService.createProduct(item.value);

      if (newProduct.product.imageUrl) {
        const image = await imageService.updateImage(
          'products',
          'undefined',
          newProduct.product._id ?? ''
        );
        newProduct.product.imageUrl = image.imageUrl;
        await productService.updateProduct(newProduct.product);
      }
    }
    emit('action');
  };

  const cancel = async () => {
    if (props.itemToEdit && props.itemToEdit.imageUrl !== item.value.imageUrl) {
      await imageService.updateImage('products', `old-${item.value._id}`, item.value._id ?? '');
    }
    emit('action');
  };

  const changeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const selectedFile = target.files?.[0];

    if (!selectedFile) {
      return alert('Por favor selecciona una imagen primero');
    }

    try {
      loading.value = true;
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('routeImage', `products/${item.value._id ?? 'undefined'}`);

      if (item.value.imageUrl) {
        await imageService.updateImage('products', item.value._id ?? '', `old-${item.value._id}`);
      }

      const imageUrl = await imageService.addImage(formData);

      if (imageUrl) {
        item.value.imageUrl = imageUrl;
      }
    } catch (error) {
      console.error('Error al actualizar la imagen:', error);
    } finally {
      loading.value = false;
    }
  };
</script>

<style lang="scss" scoped>
  .product-form {
    display: flex;
    overflow: scroll;

    &__wrapper {
      display: flex;

      &--image,
      &--content {
        flex-direction: column;
      }

      &--image {
        padding: 2rem 0 0 2rem;
        gap: 12px;
      }

      &--content {
        padding-top: 1rem;
        width: 100%;
        gap: 18px;
      }

      &--number {
        gap: 18px;
      }
    }

    &__image {
      width: 12rem;
      height: 14rem;
    }

    &__input {
      &--number {
        width: 6rem;
      }
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
