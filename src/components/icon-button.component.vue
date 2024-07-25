<template>
  <button :class="[baseClass, `${baseClass}--${size}`]" @click="$emit('click')">
    <img
      :class="`${baseClass}__icon`"
      :src="require(`../assets/media/icons/${icon}.svg`)"
      :alt="icon"
    />
  </button>
</template>

<script lang="ts" setup>
  import { PropType, toRefs } from 'vue';
  import { SizeType } from '../types/size.type';

  const baseClass = 'icon-button';

  const props = defineProps({
    size: {
      type: String as PropType<SizeType>,
      default: 'normal'
    },
    icon: {
      type: String,
      required: true
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

      #{$base-class}__icon {
        width: 1rem;
        height: 1rem;
      }
    }

    &--normal {
      width: 2rem;
      height: 2rem;

      #{$base-class}__icon {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    &--large {
      width: 3rem;
      height: 3rem;

      #{$base-class}__icon {
        width: 2.5rem;
        height: 2.5rem;
      }
    }
  }
</style>
