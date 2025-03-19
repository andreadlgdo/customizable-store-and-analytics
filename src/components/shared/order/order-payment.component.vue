<template>
  <div :class="baseClass">
    <h2 :class="`${baseClass}__title`">{{ t('order.payment.year') }}</h2>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
      <ui-textbox
        @click="value => (payment.owner = value)"
        :value="payment.owner"
        :label="t('order.payment.owner')"
        :placeholder="t('order.payment.owner')"
      />
      <ui-textbox
        @click="value => (payment.cardNumber = value)"
        :value="payment.cardNumber"
        :label="t('order.payment.cardNumber')"
        placeholder="XXXX XXXX XXXX XXXX"
      />
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <ui-textbox
          @click="value => (payment.month = value)"
          :value="payment.month"
          :label="t('order.payment.month')"
          placeholder="XX"
        />
        <ui-textbox
          @click="value => (payment.year = value)"
          :value="payment.year"
          :label="t('order.payment.year')"
          placeholder="XX"
        />
        <ui-textbox
          @click="value => (payment.cvv = value)"
          :value="payment.cvv"
          :label="t('order.payment.cvv')"
          placeholder="XXX"
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

  import UiButton from '../ui-button.component.vue';
  import UiTextbox from '../ui-textbox.component.vue';

  const baseClass = 'order-payment';

  defineEmits(['back', 'continue']);

  const { t } = useI18n();

  const payment = ref({
    owner: '',
    cardNumber: '',
    month: '',
    year: '',
    cvv: ''
  });

  const isValid = computed(
    () =>
      payment.value.owner &&
      payment.value.cardNumber &&
      payment.value.month &&
      payment.value.year &&
      payment.value.cvv
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
