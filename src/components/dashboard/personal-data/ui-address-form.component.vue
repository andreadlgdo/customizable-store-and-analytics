<template>
  <section :class="baseClass">
    <h1 :class="`${baseClass}__text`">{{ t('dashboard.personalData.address.form.title') }}</h1>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
      <ui-textbox
        @input="value => (newAddress.street = value)"
        :label="t('dashboard.personalData.address.label.street')"
        :value="newAddress.street"
      />
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <ui-textbox
          @input="value => (newAddress.number = value)"
          :label="t('dashboard.personalData.address.label.number')"
          :value="newAddress.number"
        />
        <ui-textbox
          @input="value => (newAddress.letter = value)"
          :label="t('dashboard.personalData.address.label.letter')"
          :value="newAddress.letter"
        />
        <ui-textbox
          @input="value => (newAddress.zipCode = value)"
          :label="t('dashboard.personalData.address.label.zipCode')"
          :value="newAddress.zipCode"
        />
      </div>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <ui-textbox
          @input="value => (newAddress.city = value)"
          :label="t('dashboard.personalData.address.label.city')"
          :value="newAddress.city"
        />
        <ui-textbox
          @input="value => (newAddress.country = value)"
          :label="t('dashboard.personalData.address.label.country')"
          :value="newAddress.country"
        />
        <ui-textbox
          @input="value => (newAddress.label = value)"
          :label="t('dashboard.personalData.address.label.label')"
          :value="newAddress.label"
        />
      </div>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--button`">
        <ui-button
          @click="addAddress"
          :text="
            newAddress._id
              ? t('dashboard.action.edit')
              : t('dashboard.personalData.address.action.new')
          "
          :icon="newAddress._id ? 'edit' : 'plus'"
          :disabled="isAddressInvalid"
        />
        <ui-button
          @click="cancelAddress"
          :text="t('dashboard.action.cancel')"
          icon="close"
          transparent
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { computed, ref, PropType } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { Address } from '../../../interfaces';

  import UiButton from '../../shared/ui-button.component.vue';
  import UiTextbox from '../../shared/ui-textbox.component.vue';

  const baseClass = 'ui-address-form';

  const { t } = useI18n();

  const props = defineProps({
    userId: {
      type: String,
      required: true
    },
    address: {
      type: Object as PropType<Address>,
      default: undefined
    }
  });

  const emit = defineEmits(['add', 'edit', 'cancel']);

  const newAddress = ref<Address>(
    props.address ?? {
      userId: props.userId,
      street: '',
      number: '',
      letter: '',
      zipCode: '',
      city: '',
      country: '',
      label: '',
      isDefault: false
    }
  );

  const isAddressInvalid = computed(
    () =>
      newAddress.value.userId === '' ||
      newAddress.value.street === '' ||
      newAddress.value.number === '' ||
      newAddress.value.letter === '' ||
      newAddress.value.zipCode === '' ||
      newAddress.value.city === '' ||
      newAddress.value.country === ''
  );

  const addAddress = async () =>
    props.address ? emit('edit', newAddress.value) : emit('add', newAddress.value);

  const cancelAddress = () => {
    newAddress.value = {
      userId: props.userId,
      street: '',
      number: '',
      letter: '',
      zipCode: '',
      city: '',
      country: '',
      label: '',
      isDefault: false
    };
    emit('cancel');
  };
</script>

<style lang="scss" scoped>
  .ui-address-form {
    border: 1px solid var(--color-dark-primary);
    border-radius: 16px;
    padding: 2rem;
    height: fit-content;
    margin-bottom: 1rem;

    &__text {
      margin: 0 0 16px 0;
    }

    &__wrapper {
      display: flex;
      gap: 1rem;

      &--column {
        flex-direction: column;
        margin: 24px 0;
      }

      &--row {
        align-items: center;
      }

      &--button {
        justify-content: flex-end;
      }
    }
  }
</style>
