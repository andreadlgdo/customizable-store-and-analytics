<template>
  <div v-if="isOpen" :class="[baseClass, { [`${baseClass}--collapsed`]: isCollapsed }]">
    <ui-icon-button
      @click="$emit('click')"
      v-if="icon"
      :class="`${baseClass}__icon`"
      :icon="icon"
    ></ui-icon-button>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import UiIconButton from './ui-icon-button.component.vue';

  const baseClass = 'ui-aside';

  defineProps({
    icon: String,
    isOpen: Boolean,
    isCollapsed: Boolean
  });

  defineEmits(['click']);
</script>

<style lang="scss" scoped>
  .ui-aside {
    $baseClass: &;

    position: relative;
    height: 100vh;
    width: 320px;
    background: var(--bg-main);
    box-shadow: var(--shadow-soft);

    &--collapsed {
      width: 84px;

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
        background: #beefef78;
        border-radius: 20%;
      }
    }
  }
</style>
