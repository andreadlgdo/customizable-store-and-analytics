<template>
  <div :class="baseClass">
    <h2 :class="`${baseClass}__title`">{{ t('order.payment.year') }}</h2>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
      <ui-textbox
        @input="value => (payment.owner = value)"
        :value="payment.owner"
        :label="t('order.payment.owner')"
        :placeholder="t('order.payment.owner')"
      />
      <ui-textbox
        @input="value => (payment.cardNumber = value)"
        :value="payment.cardNumber"
        :label="t('order.payment.cardNumber.label')"
        placeholder="XXXX XXXX XXXX XXXX"
        :error="cardNumberError ? t('order.payment.cardNumber.error') : ''"
      />
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <ui-textbox
          @input="value => (payment.month = value)"
          :value="payment.month"
          :label="t('order.payment.month.label')"
          placeholder="XX"
          :error="monthError ? t('order.payment.month.error') : ''"
        />
        <ui-textbox
          @input="value => (payment.year = value)"
          :value="payment.year"
          :label="t('order.payment.year.label')"
          placeholder="XX"
          :error="yearError ? t('order.payment.year.error') : ''"
        />
        <ui-textbox
          @input="value => (payment.cvv = value)"
          :value="payment.cvv"
          :label="t('order.payment.cvv.label')"
          placeholder="XXX"
          :error="cvvError ? t('order.payment.cvv.error') : ''"
        />
      </div>
    </div>
  </div>
  <div :class="`${baseClass}__footer`">
    <ui-button
      @click="$emit('back')"
      :text="t('order.action.back')"
      :class="`${baseClass}__button`"
      transparent
    />
    <ui-button
      @click="$emit('continue')"
      :text="t('order.action.continue')"
      :class="`${baseClass}__button`"
      :disabled="!isValid"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useValidations } from '../../../composables';

  import UiButton from '../ui-button.component.vue';
  import UiTextbox from '../ui-textbox.component.vue';

  const baseClass = 'order-payment';

  defineEmits(['back', 'continue']);

  const { t } = useI18n();
  const { isNumber } = useValidations();

  const payment = ref({
    owner: '',
    cardNumber: '',
    month: '',
    year: '',
    cvv: ''
  });

  const cvvError = computed(
    () =>
      payment.value.cvv.length > 0 &&
      (payment.value.cvv.length !== 3 || !isNumber(payment.value.cvv))
  );

  const cardNumberError = computed(
    () =>
      payment.value.cardNumber.length > 0 &&
      (payment.value.cardNumber.length !== 16 || !isNumber(payment.value.cardNumber))
  );

  const monthError = computed(
    () =>
      payment.value.month.length > 0 &&
      (payment.value.month.length !== 2 || !isNumber(payment.value.month))
  );

  const yearError = computed(
    () =>
      payment.value.year.length > 0 &&
      (payment.value.year.length !== 2 || !isNumber(payment.value.year))
  );

  const isValid = computed(
    () =>
      payment.value.owner &&
      payment.value.cardNumber &&
      payment.value.month &&
      payment.value.year &&
      payment.value.cvv &&
      !cvvError.value &&
      !cardNumberError.value &&
      !monthError.value &&
      !yearError.value
  );
</script>

<style lang="scss" scoped>
  .order-payment {
    &__title {
      font-weight: bold;
      margin-bottom: 1rem;
    }

    &__wrapper {
      display: flex;
      gap: 16px;

      &--column {
        flex-direction: column;
      }
    }

    &__footer {
      position: absolute;
      bottom: 24px;
      right: 0;
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
      width: 100%;
    }
  }
</style>
