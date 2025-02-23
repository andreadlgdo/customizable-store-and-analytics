<template>
  <div :class="baseClass">
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--image`">
      <img
        :src="userImage ?? require('../../../assets/media/images/empty.png')"
        alt="User image"
        :class="`${baseClass}__image`"
      />
    </div>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--content`">
      <base-text-input
        :label="t('dashboard.users.form.id')"
        :value="item?._id"
        form="semi-round"
        color="white"
        type="outline"
        disabled
      />
      <base-text-input
        @input="value => (item.email = value)"
        :label="t('dashboard.users.form.email')"
        :value="item?.email"
        form="semi-round"
        color="white"
        type="outline"
        disabled
      />
      <base-text-input
        :label="t('dashboard.users.form.password')"
        :value="item?.password"
        form="semi-round"
        color="white"
        type="outline"
        disabled
      />
      <base-text-input
        @input="value => (item.type = value)"
        :label="t('dashboard.users.form.type')"
        :value="item?.type"
        form="semi-round"
        color="white"
        type="outline"
      />
    </div>
  </div>
  <base-button
    @click="save"
    :text="itemToEdit ? t('dashboard.action.edit') : t('dashboard.action.save')"
    color="primary"
    :class="`${baseClass}__button ${baseClass}__button--save`"
    disabled
  />
  <base-button
    @click="$emit('action')"
    :text="t('dashboard.action.cancel')"
    color="default"
    :class="`${baseClass}__button ${baseClass}__button--cancel`"
  />
</template>

<script lang="ts" setup>
  import { computed, PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { User } from '../../../interfaces';

  import { BaseButton, BaseTextInput } from '../../inputs';

  const { t } = useI18n();

  const baseClass = 'product-form';

  const props = defineProps({
    itemToEdit: {
      type: Object as PropType<User>,
      default: undefined
    }
  });

  const emit = defineEmits(['action']);

  const item = ref<User>(
    props.itemToEdit ?? {
      email: '',
      password: '',
      type: '',
      imageUrl: ''
    }
  );

  const userImage = computed(() =>
    item.value?.imageUrl !== '' ? item.value?.imageUrl : undefined
  );

  const save = async () => {
    if (props.itemToEdit) {
      //await productService.updateProduct(item.value);
    } else {
      //const newProduct = await productService.createProduct(item.value);
    }
    emit('action');
  };
</script>

<style lang="scss" scoped>
  .product-form {
    display: flex;
    gap: 48px;
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
