<template>
  <div :class="baseClass">
    <section :style="{ display: 'grid', gridTemplateColumns: '0.4fr 1fr' }">
      <div :class="`${baseClass}__wrapper`">
        <ui-image :image="productImage" type="semi-round" upload-mode size="large" />
      </div>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--header`">
        <ui-textbox
          v-if="itemToEdit"
          :value="itemToEdit._id"
          :label="t('dashboard.products.form.id')"
          disabled
        />
        <ui-textbox
          @input="value => (item.name = value)"
          :value="item.name"
          :label="t('dashboard.products.form.name')"
        />
        <ui-textbox
          @input="value => (item.description = value)"
          :value="item.description"
          :label="t('dashboard.products.form.description')"
        />
      </div>
    </section>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--content`">
      <div :class="`${baseClass}__wrapper`">
        <ui-select
          @change="value => (parentCategory = value)"
          :value="parentCategory"
          :options="parentCategories"
          placeholder="Select"
          label="Categories"
        />
        <ui-select
          v-if="parentCategory && !!childrenCategories(parentCategory).length"
          @change="value => (childrenCategory = value)"
          :value="childrenCategory"
          :options="childrenCategories(parentCategory)"
          placeholder="Select"
          label="Subcategorias"
        />
      </div>
      <div :class="`${baseClass}__wrapper`">
        <ui-textbox
          @input="value => (item.price = value)"
          :value="item.price"
          :label="t('dashboard.products.form.price')"
        />
        <ui-textbox
          @input="value => (item.quantity = value)"
          :value="item.quantity"
          :label="t('dashboard.products.form.quantity')"
        />
      </div>
      <ui-checkbox
        @change="item.onSale = !item.onSale"
        :value="item.onSale"
        :text="t('dashboard.products.form.onSale')"
      />
      <ui-textbox
        @input="value => (item.priceWithDiscount = value)"
        v-if="item.onSale"
        :value="item.priceWithDiscount"
        :label="t('dashboard.products.form.priceWithDiscount')"
        :style="{ width: '50%' }"
      />
    </div>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--button`">
      <ui-button
        @click="save"
        :text="itemToEdit ? t('dashboard.action.edit') : t('dashboard.action.save')"
        icon="edit"
        :disabled="itemToEdit && (!item.name || item.price > 0)"
      />
      <ui-button @click="cancel" :text="t('dashboard.action.cancel')" icon="close" transparent />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType, ref, watch, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  import UiButton from '../shared/ui-button.component.vue';
  import UiCheckbox from '../shared/ui-checkbox.component.vue';
  import UiImage from '../shared/ui-image.component.vue';
  import UiTextbox from '../shared/ui-textbox.component.vue';
  import UiSelect from '../shared/ui-select.component.vue';

  import { productService } from '../../services';
  import { Category, Product } from '../../interfaces';
  import { useI18n } from 'vue-i18n';
  import { useCategories } from '../../composables';

  const router = useRouter();
  const { t } = useI18n();

  const { categories, loadCategories } = useCategories();

  const baseClass = 'ui-product-form';

  const props = defineProps({
    itemToEdit: {
      type: Object as PropType<Product>,
      default: undefined
    }
  });

  const emit = defineEmits(['action']);

  const parentCategory = ref('');
  const childrenCategory = ref('');

  const item = ref<Product>(
    props.itemToEdit ?? {
      name: '',
      description: '',
      imageUrl: '',
      categories: [],
      price: 0,
      priceWithDiscount: 0,
      quantity: 0,
      onSale: false
    }
  );

  const productImage = computed(() =>
    item.value?.imageUrl !== '' ? item.value?.imageUrl : undefined
  );

  const parentCategories = computed(() =>
    categories.value?.filter((category: Category) => !category.parentId)
  );

  const childrenCategories = (parentCategory: string) => {
    const parentCategoryId = parentCategories.value?.find(p => p.title === parentCategory);
    return categories.value?.filter(
      (category: Category) => category.parentId === parentCategoryId?._id
    );
  };

  const goToList = () => {
    router.push({
      name: 'ProductsManagement'
    });
  };

  const cancel = () => {
    emit('action');
    goToList();
  };

  const save = () => {
    if (props.itemToEdit) {
      productService.updateProduct(item.value);
    }
    emit('action');
    goToList();
  };

  const findCategory = (categories: Category[]) => {
    return categories?.find(
      category => item.value.categories?.findIndex(target => target === category.title) !== -1
    );
  };

  watch(
    () => props.itemToEdit,
    () => (item.value = props.itemToEdit ?? item.value),
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

  onMounted(async () => await loadCategories());
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
    }
  }
</style>
