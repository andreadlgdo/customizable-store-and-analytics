<template>
  <div :class="baseClass">
    <input
      :class="[`${baseClass}__wrapper`, { [`${baseClass}__wrapper--icon`]: icon }]"
      :type="type"
      :placeholder="placeholder"
    />
    <icon-button
      v-if="icon"
      :class="`${baseClass}__icon ${baseClass}__icon--user`"
      :icon="icon"
      :color-attribute="colorAttribute"
    />
    <icon-button
      :class="`${baseClass}__icon ${baseClass}__icon--close`"
      icon="close"
      size="small"
      color-attribute="fill"
    />
  </div>
</template>

<script lang="ts" setup>
  import IconButton from '../icons/icon-button.component.vue';
  import { PropType } from 'vue';
  import { SvgIconType } from '@/types/svg-icon.type';

  const baseClass = 'input';

  defineProps({
    type: {
      type: String, //text, color, password, submit, button, number, checkbox
      default: 'text'
    },
    icon: {
      type: String
    },
    colorAttribute: {
      type: String as PropType<SvgIconType>,
      default: undefined
    },
    placeholder: String //text, color, password, submit, button, number, checkbox
  });
</script>

<style lang="scss" scoped>
  .input {
    position: relative;

    &__wrapper {
      background: var(--bg-main);
      border-color: var(--color-main);
      border-radius: 20px;
      height: 42px;
      min-width: 324px;
      padding-left: 16px;
      outline: none;

      &--icon {
        padding-left: 42px;
      }
    }

    &__icon {
      position: absolute;

      &--user {
        left: 8px;
        top: 7px;
      }

      &--close {
        right: 10px;
        top: 10px;
      }
    }
  }
</style>
