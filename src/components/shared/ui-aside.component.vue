<template>
  <transition :name="`${baseClass}--${position}`">
    <div
      v-if="isOpen"
      :class="[
        baseClass,
        `${baseClass}--${position}`,
        { [`${baseClass}--collapsed`]: isCollapsed },
        { [`${baseClass}--relative`]: !fixed }
      ]"
    >
      <ui-icon-button
        @click="$emit('click')"
        v-if="icon"
        :class="`${baseClass}__icon`"
        :icon="icon"
      />
      <slot />
      <ui-language v-if="language" :class="`${baseClass}__toggle`" />
    </div>
  </transition>
</template>

<script lang="ts" setup>
  import UiIconButton from './ui-icon-button.component.vue';
  import UiLanguage from '../shared/ui-language.component.vue';

  const baseClass = 'ui-aside';

  defineProps({
    fixed: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'right'
    },
    icon: String,
    isOpen: Boolean,
    isCollapsed: Boolean,
    language: Boolean
  });

  defineEmits(['click']);
</script>

<style lang="scss" scoped>
  .ui-aside {
    $baseClass: &;

    position: fixed;
    top: 0;
    height: 100vh;
    min-width: 320px;
    background: var(--bg-main);
    box-shadow: var(--shadow-soft);
    z-index: 1;

    &--relative {
      position: relative;
    }

    &--collapsed {
      min-width: 84px;

      #{$baseClass}__icon {
        right: 22px;
      }
    }

    &__icon {
      position: absolute;
      top: 16px;
      right: 16px;
      padding: 6px;

      &:hover {
        background: var(--color-soft-primary);
        border-radius: 20%;
      }
    }

    &__toggle {
      position: absolute;
      bottom: 16px;
      left: 70px;
    }

    &--right {
      right: 0;

      &-enter-active {
        animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      }

      &-leave-active {
        animation: slide-out-right 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
      }
    }

    &--left {
      &-enter-active {
        animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      }

      &-leave-active {
        animation: slide-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
      }
    }
  }
</style>
