<template>
  <div :class="`${baseClass}-container`">
    <div :class="baseClass">
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
        <h2 :class="`${baseClass}__title`">{{ t('order.options.personalData') }}</h2>
        <div v-if="userRegister" :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
          <UiTextbox :value="user.name" :label="t('asides.register.form.name')" disabled />
          <UiTextbox :value="user.surname" :label="t('asides.register.form.surname')" disabled />
        </div>
        <UiTextbox :value="user.email" label="Email" disabled />
        <h2 :class="`${baseClass}__title`">{{ t('order.address.title') }}</h2>
        <UiAddress :addresses="[address]" :editable="false" disabled />
        <h2 :class="`${baseClass}__title`">{{ t('order.payment.title') }}</h2>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
          <UiTextbox :value="payment.owner" :label="t('order.payment.owner')" disabled />
          <UiTextbox
            :value="payment.cardNumber"
            :label="t('order.payment.cardNumber.label')"
            disabled
          />
          <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
            <UiTextbox :value="payment.month" :label="t('order.payment.month.label')" disabled />
            <UiTextbox :value="payment.year" :label="t('order.payment.year.label')" disabled />
            <UiTextbox :value="payment.cvv" :label="t('order.payment.cvv.label')" disabled />
          </div>
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
        @click="$emit('finish')"
        :text="t('order.action.finish')"
        :class="`${baseClass}__button`"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';

  import UiAddress from '@/components/dashboard/personal-data/ui-address.component.vue';

  import { Address } from '@/interfaces';
  import { useUsers } from '@/composables';

  import UiButton from '@/components/shared/ui-button.component.vue';
  import UiTextbox from '@/components/shared/ui-textbox.component.vue';

  const baseClass = 'order-summary';

  defineProps({
    user: {
      type: Object,
      required: true
    },
    address: {
      type: Object as PropType<Address>,
      required: false
    },
    payment: {
      type: Object,
      required: true
    }
  });

  defineEmits(['back', 'finish']);

  const { t } = useI18n();
  const { user: userRegister } = useUsers();
</script>

<style lang="scss" scoped>  
  .order-summary {
    flex: 1;
    overflow-y: auto;
    max-height: 80%;

    &__title {
      font-weight: bold;
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
      bottom: 88px;
      right: 0;
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
      width: 100%;
      background-color: var(--bg-main);
    }
  }
</style>
