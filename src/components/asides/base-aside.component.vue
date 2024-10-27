<template>
  <transition :name="baseClass">
    <div
      v-if="isOpen"
      :class="[baseClass, `${baseClass}--${type}`, `${baseClass}--${closePosition}`]"
    >
      <div :class="`${baseClass}__header`">
        <icon-button
          @click="$emit('close')"
          :class="`${baseClass}__icon ${baseClass}__icon--close`"
          icon="close"
          color-attribute="fill"
        />
      </div>
      <slot />
    </div>
  </transition>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import { AsideType, PositionType } from '../../types';

  import IconButton from '../icons/icon-button.component.vue';

  const baseClass = 'base-aside';

  defineProps({
    isOpen: Boolean,
    type: {
      type: String as PropType<AsideType>,
      default: 'square'
    },
    closePosition: {
      type: String as PropType<PositionType>,
      default: 'right'
    }
  });

  defineEmits(['close']);
</script>

<style lang="scss" scoped>
  .base-aside {
    $base-class: &;

    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 400px;
    background: var(--bg-main);
    box-shadow: var(--shadow-aside);
    overflow: hidden;

    &--round {
      border-radius: 50px;
      margin: 4px 6px 0 0;
      height: 99vh;
    }

    &--left {
      #{$base-class}__header {
        justify-content: flex-start;
        padding-left: 24px;
      }
    }

    &__header {
      position: absolute;
      top: 1.5rem;
      right: 2rem;
      z-index: 1;
    }

    &-enter-active {
      animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }

    &-leave-active {
      animation: slide-out-right 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
    }
  }

  @media only screen and (max-width: 768px) {
    .base-aside {
      margin: 0;
      height: 100%;
      width: 400px;
    }
  }

  @media only screen and (max-width: 400px) {
    .base-aside {
      margin: 0;
      height: 100%;
      width: 100%;
      border-radius: 0;
    }
  }
</style>
