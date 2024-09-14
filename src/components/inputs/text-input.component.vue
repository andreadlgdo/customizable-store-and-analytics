<template>
  <div :class="baseClass">
    <input
      @input="$emit('input', query)"
      v-model="query"
      :class="[`${baseClass}__wrapper`, { [`${baseClass}__wrapper--icon`]: icon }]"
      :type="type"
      :placeholder="placeholder"
    />
    <svg-icon
      v-if="icon"
      :class="`${baseClass}__icon ${baseClass}__icon--info`"
      :src="require(`../../assets/media/icons/${icon}.svg`)"
      :color-attribute="colorAttribute"
      size="small"
    />
    <icon-button
      @click="query = ''"
      :class="`${baseClass}__icon ${baseClass}__icon--close`"
      icon="close"
      size="small"
      color-attribute="fill"
    />
  </div>
</template>

<script lang="ts" setup>
  import IconButton from '../icons/icon-button.component.vue';
  import SvgIcon from '../icons/svg-icon.component.vue';
  import { PropType, ref } from 'vue';
  import { SvgIconType } from '@/types/svg-icon.type';

  const baseClass = 'input';

  const props = defineProps({
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
    value: String,
    placeholder: String //text, color, password, submit, button, number, checkbox
  });

  defineEmits(['input']);

  const query = ref(props.value ?? '');
</script>

<style lang="scss" scoped>
  .input {
    position: relative;
    width: 324px;

    &__wrapper {
      background: var(--bg-main);
      border: 2px solid var(--color-main);
      border-radius: 20px;
      height: 42px;
      width: 324px;
      padding-left: 16px;
      outline: none;
      color: var(--color-main);

      &--icon {
        padding-left: 40px;
      }
    }

    &__icon {
      position: absolute;

      &--info {
        left: 14px;
        top: 11px;
      }

      &--close {
        right: 10px;
        top: 10px;
      }
    }
  }
</style>
