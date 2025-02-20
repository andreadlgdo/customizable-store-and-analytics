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
      />
      <ui-button @click="cancel" :text="t('dashboard.action.cancel')" icon="close" transparent />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  import UiButton from '../shared/ui-button.component.vue';
  import UiCheckbox from '../shared/ui-checkbox.component.vue';
  import UiImage from '../shared/ui-image.component.vue';
  import UiTextbox from '../shared/ui-textbox.component.vue';

  import { productService } from '../../services';
  import { Product } from '../../interfaces';
  import { useI18n } from 'vue-i18n';

  const router = useRouter();
  const { t } = useI18n();

  const baseClass = 'ui-product-form';

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
      priceWithDiscount: 0,
      quantity: 0,
      onSale: false
    }
  );

  const productImage = computed(() =>
    item.value?.imageUrl !== '' ? item.value?.imageUrl : undefined
  );

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

  watch(
    () => props.itemToEdit,
    () => (item.value = props.itemToEdit ?? item.value),
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .ui-product-form {
    position: relative;
    margin: 2rem;

    &__wrapper {
      display: flex;
      gap: 1rem;

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
