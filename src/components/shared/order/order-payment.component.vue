<template>
  <div :class="baseClass">
    <h2 :class="`${baseClass}__title`">{{ t('order.payment.title') }}</h2>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
      <ui-textbox
        @input="value => (paymentData.owner = value)"
        :value="paymentData.owner"
        :label="t('order.payment.owner')"
        :placeholder="t('order.payment.owner')"
      />
      <ui-textbox
        @input="value => (paymentData.cardNumber = value)"
        :value="paymentData.cardNumber"
        :label="t('order.payment.cardNumber.label')"
        placeholder="XXXX XXXX XXXX XXXX"
        :error="cardNumberError ? t('order.payment.cardNumber.error') : ''"
      />
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <ui-textbox
          @input="value => (paymentData.month = value)"
          :value="paymentData.month"
          :label="t('order.payment.month.label')"
          placeholder="XX"
          :error="monthError ? t('order.payment.month.error') : ''"
        />
        <ui-textbox
          @input="value => (paymentData.year = value)"
          :value="paymentData.year"
          :label="t('order.payment.year.label')"
          placeholder="XX"
          :error="yearError ? t('order.payment.year.error') : ''"
        />
        <ui-textbox
          @input="value => (paymentData.cvv = value)"
          :value="paymentData.cvv"
          :label="t('order.payment.cvv.label')"
          placeholder="XXX"
          :error="cvvError ? t('order.payment.cvv.error') : ''"
        />
      </div>
    </div>
  </div>
  <div :class="`${baseClass}__footer`">
    <UiButton
      @click="$emit('back')"
      :text="t('order.action.back')"
      :class="`${baseClass}__button`"
      transparent
    />
    <UiButton
      @click="$emit('continue', paymentData)"
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

  const props = defineProps({
    payment: {
      type: Object,
      required: true
    }
  });

  defineEmits(['back', 'continue']);

  const { t } = useI18n();
  const { isNumber } = useValidations();

  const paymentData = ref(
    props.payment ?? {
      owner: '',
      cardNumber: '',
      month: '',
      year: '',
      cvv: ''
    }
  );

  const cvvError = computed(
    () =>
      paymentData.value.cvv.length > 0 &&
      (paymentData.value.cvv.length !== 3 || !isNumber(paymentData.value.cvv))
  );

  const cardNumberError = computed(
    () =>
      paymentData.value.cardNumber.length > 0 &&
      (paymentData.value.cardNumber.length !== 16 || !isNumber(paymentData.value.cardNumber))
  );

  const monthError = computed(
    () =>
      paymentData.value.month.length > 0 &&
      (paymentData.value.month.length !== 2 || !isNumber(paymentData.value.month))
  );

  const yearError = computed(
    () =>
      paymentData.value.year.length > 0 &&
      (paymentData.value.year.length !== 2 || !isNumber(paymentData.value.year))
  );

  const isValid = computed(
    () =>
      paymentData.value.owner &&
      paymentData.value.cardNumber &&
      paymentData.value.month &&
      paymentData.value.year &&
      paymentData.value.cvv &&
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
