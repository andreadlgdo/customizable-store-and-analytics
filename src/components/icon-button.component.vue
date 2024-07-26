<template>
  <button :class="[baseClass, `${baseClass}--${size}`]" @click="$emit('click')">
    <SvgIcon
      :class="`${baseClass}__icon`"
      :src="require(`../../assets/media/icons/${icon}.svg`)"
      :size="size"
      :colorAttribute="colorAttribute"
    />
  </button>
</template>

<script lang="ts" setup>
  import { PropType, toRefs } from 'vue';
  import { SizeType } from '../../types/size.type';
  import SvgIcon from './svg-icon.component.vue';

  const baseClass = 'icon-button';

  const props = defineProps({
    size: {
      type: String as PropType<SizeType>,
      default: 'normal'
    },
    icon: {
      type: String,
      required: true
    },
    colorAttribute: {
      type: String, //fill, stroke and both
      default: undefined
    }
  });

  defineEmits(['click']);

  const { size } = toRefs(props);
</script>

<style scoped lang="scss">
  .icon-button {
    $base-class: &;

    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;

    &--small {
      width: 1.5rem;
      height: 1.5rem;
    }

    &--normal {
      width: 2rem;
      height: 2rem;
    }

    &--large {
      width: 3rem;
      height: 3rem;
    }
  }
</style>
