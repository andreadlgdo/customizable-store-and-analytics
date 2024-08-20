<template>
  <transition :name="baseClass">
    <div v-if="isOpen" :class="[baseClass, `${baseClass}--${type}`]">
      <div :class="`${baseClass}__header`">
        <slot name="header" />
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

  import IconButton from '../icons/icon-button.component.vue';

  import { AsideType } from '../../types/aside.type';

  const baseClass = 'aside';

  defineProps({
    isOpen: Boolean,
    type: {
      type: String as PropType<AsideType>,
      default: 'square'
    }
  });

  defineEmits(['close']);
</script>

<style lang="scss" scoped>
  .aside {
    $base-class: &;

    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 400px;
    background: var(--bg-main);
    box-shadow: var(--shadow-header);

    &--round {
      margin-right: 4px;
      border-radius: 50px;
      margin-top: 4px;
      height: 99vh;
      box-shadow: var(--shadow-aside);

      #{$base-class}__header {
        border-bottom: 1px solid var(--color-soft);
      }
    }

    &-enter-active {
      animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }

    &-leave-active {
      animation: slide-out-right 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
      height: 5rem;
      padding-right: 24px;
    }
  }

  @media only screen and (max-width: 768px) {
    .aside {
      width: 100%;
    }
  }
</style>
