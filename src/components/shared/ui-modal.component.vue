<template>
  <div v-if="isOpen">
    <div :class="`${baseClass}__overlay`" @click="$emit('close')"></div>
    <div :class="baseClass">
      <UiIconButton
        @click="$emit('close')"
        icon="close"
        size="small"
        :class="`${baseClass}__icon`"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import UiIconButton from '@/components/shared/ui-icon-button.component.vue';

  const baseClass = 'ui-modal';

  defineProps({
    isOpen: Boolean
  });

  defineEmits(['close']);
</script>

<style lang="scss" scoped>
  .ui-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--color-white);
    box-shadow: var(--shadow-soft);
    z-index: 1000;

    &__overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }

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
