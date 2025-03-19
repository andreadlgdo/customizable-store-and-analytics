<template>
  <div :class="baseClass"></div>
  <div :class="`${baseClass}__footer`">
    <ui-button
      @click="$emit('back')"
      :text="t('order.action.back')"
      :class="`${baseClass}__button`"
      transparent
    />
    <ui-button
      @click="$emit('finish')"
      :text="t('order.action.finish')"
      :class="`${baseClass}__button`"
    />
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';

  import UiButton from '../ui-button.component.vue';

  const baseClass = 'order-summary';

  defineEmits(['back', 'finish']);

  const { t } = useI18n();
</script>

<style lang="scss" scoped>
  .order-summary {
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
