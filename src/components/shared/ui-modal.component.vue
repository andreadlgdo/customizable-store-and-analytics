<template>
  <div v-if="isOpen" :class="baseClass">
    <UiIconButton
      @click="$emit('close')"
      icon="close"
      size="small"
      :class="`${baseClass}__icon`"
    />
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import UiIconButton from './ui-icon-button.component.vue';

  const baseClass = 'ui-modal';

  defineProps({
    isOpen: Boolean
  });

  defineEmits(['close']);
</script>

<style lang="scss" scoped>
  .ui-modal {
    position: fixed;
    background: var(--color-white);
    box-shadow: var(--shadow-soft);

    &__icon {
      position: absolute;
      right: 12px;
      top: 14px;
      padding: 8px;
      z-index: 1;

      &:hover {
        border-radius: 50%;
        background-color: var(--color-soft);
      }
    }
  }
</style>
