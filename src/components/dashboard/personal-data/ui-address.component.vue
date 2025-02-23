<template>
  <section v-for="address in addresses" :key="address._id" :class="baseClass">
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--content`">
      <p>{{ address.label }}</p>
      <ui-checkbox
        @change="$emit('setDefault', address)"
        :value="address.isDefault"
        :text="t('dashboard.personalData.address.default')"
      />
    </div>
    <p>
      {{ address.street + ', ' + address.number + address.letter + ', ' + address.zipCode }}
    </p>
    <p>{{ address.city + ', ' + address.country }}</p>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--button`">
      <ui-button
        @click="$emit('edit', address)"
        :text="t('dashboard.action.edit')"
        icon="edit"
        transparent
      />
      <ui-button
        @click="$emit('delete', address)"
        :text="t('dashboard.personalData.address.action.remove')"
        icon="delete"
        transparent
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { Address } from '../../../interfaces';

  import UiButton from '../../shared/ui-button.component.vue';
  import UiCheckbox from '../../shared/ui-checkbox.component.vue';

  const baseClass = 'ui-address';

  const { t } = useI18n();

  defineProps({
    addresses: {
      type: Array as PropType<Address[]>,
      required: true
    }
  });

  defineEmits(['setDefault', 'edit', 'delete']);
</script>

<style lang="scss" scoped>
  .ui-address {
    border: 1px solid var(--color-dark-primary);
    border-radius: 16px;
    padding: 1rem 2rem;
    height: fit-content;
    margin-bottom: 1rem;

    &__wrapper {
      display: flex;

      &--content {
        justify-content: space-between;
        margin-bottom: 1rem;
      }

      &--button {
        gap: 1rem;
        justify-content: flex-end;
      }
    }
  }
</style>
