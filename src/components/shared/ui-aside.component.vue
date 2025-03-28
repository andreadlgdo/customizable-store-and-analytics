<template>
  <transition :name="`${baseClass}--${position}`">
    <div
      v-if="isOpen"
      ref="asideRef"
      :class="[
        baseClass,
        `${baseClass}--${position}`,
        { [`${baseClass}--collapsed`]: isCollapsed },
        { [`${baseClass}--relative`]: !fixed }
      ]"
    >
      <UiIconButton
        @click="$emit('click')"
        v-if="icon"
        :class="`${baseClass}__icon`"
        :icon="icon"
      />
      <slot />
      <UiLanguage v-if="language && !isCollapsed" :class="`${baseClass}__toggle`" />
    </div>
  </transition>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';

  import UiIconButton from './ui-icon-button.component.vue';
  import UiLanguage from '../shared/ui-language.component.vue';

  const baseClass = 'ui-aside';

  const props = defineProps({
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

  const emit = defineEmits(['click']);

  const asideRef = ref<HTMLElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (asideRef.value && !asideRef.value.contains(event.target as Node) && props.fixed) {
      emit('click');
    }
  };

  onMounted(() => document.addEventListener('mousedown', handleClickOutside));
  onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside));
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

      #{$baseClass}__icon {
        top: 16px;
        right: 16px;
      }
    }

    &--collapsed {
      min-width: 84px;

      #{$baseClass}__icon {
        right: 22px;
      }
    }

    &__icon {
      position: absolute;
      top: 32px;
      right: 28px;
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
