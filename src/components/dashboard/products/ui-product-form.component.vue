<template>
  <div :class="baseClass">
    <section :style="{ display: 'grid', gridTemplateColumns: '0.4fr 1fr' }">
      <div :class="`${baseClass}__wrapper`">
        <UiImage
          v-if="!loadingImage"
          @upload="changeImage"
          :image="productImage"
          type="semi-round"
          upload-mode
          size="large"
        />
      </div>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--header`">
        <UiTextbox
          v-if="itemToEdit"
          :value="itemToEdit._id"
          :label="t('dashboard.products.form.id')"
          disabled
        />
        <UiTextbox
          @input="value => (item.name = value)"
          :value="item.name"
          :label="t('dashboard.products.form.name')"
        />
        <UiTextbox
          @input="value => (item.description = value)"
          :value="item.description"
          :label="t('dashboard.products.form.description')"
        />
      </div>
    </section>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--content`">
      <div :class="`${baseClass}__wrapper`">
        <UiSelect
          @change="value => (parentCategory = value)"
          :value="parentCategory"
          :options="parentCategories"
          placeholder="Select category"
          label="Categories"
        />
        <UiSelect
          v-if="parentCategory && !!childrenCategories(parentCategory).length"
          @change="value => (childrenCategory = value)"
          :value="childrenCategory"
          :options="childrenCategories(parentCategory)"
          placeholder="Select subcategory"
          label="Subcategorias"
        />
      </div>
      <div :class="`${baseClass}__wrapper`">
        <UiTextbox
          @input="value => (item.price = value)"
          :value="item.price"
          :label="t('dashboard.products.form.price')"
          type="number"
          :class="`${baseClass}__textbox`"
        />
        <UiCheckbox
          @change="item.onSale = !item.onSale"
          :value="item.onSale"
          :text="t('dashboard.products.form.onSale')"
          :class="`${baseClass}__checkbox`"
        />
        <UiTextbox
          @input="value => (item.priceWithDiscount = value)"
          v-if="item.onSale"
          :value="item.priceWithDiscount"
          :label="t('dashboard.products.form.priceWithDiscount')"
          :style="{ width: '50%' }"
          type="number"
        />
      </div>
      <UiCheckbox
        @change="item.isUniqueSize = !item.isUniqueSize"
        :value="item.isUniqueSize"
        :text="t('dashboard.products.form.uniqueSize')"
      />
      <div v-if="!item.isUniqueSize" :class="`${baseClass}__wrapper`">
        <UiTextbox
          v-for="stock in item.stock"
          :key="stock.size"
          @input="value => (stock.quantity = value)"
          :value="stock.quantity"
          type="number"
          :label="t('dashboard.products.form.quantity') + ' ' + stock.size"
        />
      </div>
      <UiTextbox
        v-else
        @input="value => (item.uniqueStock = value)"
        :value="item.uniqueStock"
        :label="t('dashboard.products.form.stock')"
        type="number"
        :class="`${baseClass}__textbox`"
      />
    </div>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--button`">
      <UiButton
        @click="save"
        :text="itemToEdit ? t('dashboard.action.edit') : t('dashboard.action.save')"
        icon="edit"
        :disabled="!itemToEdit && (!item.name || item.price < 0)"
      />
      <UiButton @click="cancel" :text="t('dashboard.action.cancel')" icon="close" transparent />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType, ref, watch, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  import UiButton from '../../shared/ui-button.component.vue';
  import UiCheckbox from '../../shared/ui-checkbox.component.vue';
  import UiImage from '../../shared/ui-image.component.vue';
  import UiTextbox from '../../shared/ui-textbox.component.vue';
  import UiSelect from '../../shared/ui-select.component.vue';

  import { imageService, productService } from '../../../services';
  import { Category, Product } from '../../../interfaces';
  import { useI18n } from 'vue-i18n';
  import { useCategories } from '../../../composables';

  const router = useRouter();
  const { t } = useI18n();

  const { parentCategories, loadCategories, childrenCategories } = useCategories();

  const baseClass = 'ui-product-form';

  const props = defineProps({
    itemToEdit: {
      type: Object as PropType<Product>,
      default: undefined
    }
  });

  const emit = defineEmits(['cancel', 'save']);

  const date = new Date();

  const parentCategory = ref<string>('');
  const childrenCategory = ref<string>('');

  const initializeItem = (itemToEdit?: Product) => {
    return {
      _id: itemToEdit?._id ?? undefined,
      name: itemToEdit?.name ?? '',
      description: itemToEdit?.description ?? '',
      imageUrl: itemToEdit?.imageUrl ?? '',
      categories: itemToEdit?.categories?.length ? itemToEdit.categories : [],
      price: itemToEdit?.price ?? 0,
      priceWithDiscount: itemToEdit?.priceWithDiscount ?? 0,
      stock: itemToEdit?.stock?.length
        ? itemToEdit.stock
        : [
            { quantity: 0, size: 'XS' },
            { quantity: 0, size: 'S' },
            { quantity: 0, size: 'M' },
            { quantity: 0, size: 'L' },
            { quantity: 0, size: 'XL' }
          ],
      isUniqueSize: itemToEdit?.isUniqueSize ?? false,
      uniqueStock: itemToEdit?.uniqueStock ?? 0,
      onSale: itemToEdit?.onSale ?? false
    };
  };

  const item = ref<Product>(initializeItem(props.itemToEdit));

  const loadingImage = ref(false);

  const randomNumber = ref(Math.random());

  const productImage = computed(() =>
    item.value?.imageUrl !== '' ? item.value?.imageUrl : undefined
  );

  const goToList = () => {
    router.push({
      name: 'ProductsManagement'
    });
  };

  const cancel = () => {
    emit('cancel');
    goToList();
  };

  const save = async () => {
    item.value.categories = [];
    if (parentCategory.value !== '') {
      item.value.categories?.push(parentCategory.value);
    }
    if (childrenCategory.value !== '') {
      item.value.categories?.push(childrenCategory.value);
    }
    if (props.itemToEdit) {
      await productService.updateProduct(item.value);
    } else {
      const newProduct = await productService.createProduct(item.value);

      const name = newProduct.product._id + date.getTime();
      if (newProduct.product.imageUrl) {
        const image = await imageService.updateImage(
          'products',
          randomNumber.value.toString(),
          name
        );
        newProduct.product.imageUrl = image.imageUrl;
        await productService.updateProduct(newProduct.product);
      }
    }
    goToList();
    emit('save');
  };

  const findCategory = (categories: Category[]) => {
    return categories?.find(
      category => item.value.categories?.findIndex(target => target === category.title) !== -1
    );
  };

  const changeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const selectedFile = target.files?.[0];

    if (!selectedFile) {
      return alert('Por favor selecciona una imagen primero');
    }

    try {
      loadingImage.value = true;
      const formData = new FormData();
      const imageName = item.value._id
        ? item.value._id + date.getTime()
        : randomNumber.value.toString();

      formData.append('image', selectedFile);
      formData.append('routeImage', `products/${imageName}`);

      const imageUrl = await imageService.addImage(formData);

      if (imageUrl) {
        item.value.imageUrl = imageUrl;
      }
    } catch (error) {
      console.error('Error al actualizar la imagen:', error);
    } finally {
      loadingImage.value = false;
    }
  };

  watch(
    () => props.itemToEdit,
    () => {
      item.value = initializeItem(props.itemToEdit);
    },
    { immediate: true }
  );

  watch(
    () => parentCategories.value,
    () => {
      const selectedParentCategory = findCategory(parentCategories.value ?? []);

      if (selectedParentCategory) {
        parentCategory.value = selectedParentCategory.title;

        const children = childrenCategories(selectedParentCategory.title);
        const selectedChildrenCategory = findCategory(children ?? []);

        childrenCategory.value = selectedChildrenCategory?.title ?? '';
      }
    },
    { immediate: true }
  );

  onMounted(async () => {
    await loadCategories();
  });
</script>

<style lang="scss" scoped>
  .ui-product-form {
    position: relative;
    margin: 2rem;
    height: 100%;

    &__wrapper {
      display: flex;
      gap: 1rem;
      overflow: visible !important;

      &--header,
      &--content {
        flex-direction: column;
        justify-content: center;
      }

      &--content {
        margin-top: 1rem;
      }

      &--button {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
      }

      &--price {
        align-items: center;
      }
    }

    &__textbox {
      width: 8rem;
    }

    &__checkbox {
      align-self: flex-end;
      margin-bottom: 8px;
    }
  }
</style>
