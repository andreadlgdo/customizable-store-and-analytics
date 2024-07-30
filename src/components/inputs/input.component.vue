<template>
  <div :class="baseClass">
    <input
      v-model="query"
      :class="[`${baseClass}__wrapper`, { [`${baseClass}__wrapper--icon`]: icon }]"
      :type="type"
      :placeholder="placeholder"
    />
    <svg-icon
      v-if="icon"
      :class="`${baseClass}__icon ${baseClass}__icon--user`"
      :src="require(`../../assets/media/icons/${icon}.svg`)"
      :colorAttribute="colorAttribute"
    />
    <icon-button
      @click="query = ''"
      :class="`${baseClass}__icon ${baseClass}__icon--close`"
      icon="close"
      size="small"
      colorAttribute="fill"
    />
  </div>
</template>

<script lang="ts" setup>
  import IconButton from '../icons/icon-button.component.vue';
  import SvgIcon from '../icons/svg-icon.component.vue';
  import { PropType, ref } from 'vue';
  import { SvgIconType } from '@/types/svg-icon.type';

  const baseClass = 'input';

  const query = ref('');

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
      border: 2px solid var(--color-main);
      border-radius: 20px;
      height: 42px;
      min-width: 324px;
      padding-left: 16px;
      outline: none;
      color: var(--color-main);

      &--icon {
        padding-left: 42px;
      }
    }

    &__icon {
      position: absolute;

      &--user {
        left: 12px;
        top: 9px;
      }

      &--close {
        right: 10px;
        top: 10px;
      }
    }
  }
</style>
