<template>
  <div
    :class="[
      baseClass,
      `${baseClass}--${size}`,
      {
        [`${baseClass}__${colorAttribute}`]: colorAttribute,
        [`${baseClass}__${colorAttribute}--error`]: error
      }
    ]"
    v-html="svgContent"
  ></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, PropType, watch } from 'vue';
  import { SizeType } from '../../types/size.type';
  import { SvgIconType } from '../../types/svg-icon.type';

  const baseClass = 'svg-icon';

  const props = defineProps({
    src: {
      type: String,
      required: true
    },
    size: {
      type: String as PropType<SizeType>,
      default: 'normal'
    },
    colorAttribute: {
      type: String as PropType<SvgIconType>,
      default: undefined
    },
    error: Boolean
  });

  const svgContent = ref('');

  const updateSvgContent = async () => {
    const response = await fetch(props.src);
    svgContent.value = await response.text();
  };

  watch(
    () => props.src,
    () => {
      updateSvgContent();
    },
    { immediate: true }
  );

  onMounted(() => {
    updateSvgContent();
  });
</script>

<style lang="scss">
  .svg-icon {
    display: flex;
    justify-content: center;
    align-items: center;

    &--mini svg {
      width: 0.65rem;
      height: 0.65rem;
    }

    &--small svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    &--normal svg {
      width: 1.85rem;
      height: 1.85rem;
    }

    &--large svg {
      width: 2.5rem;
      height: 2.5rem;
    }

    &__fill {
      & svg {
        fill: var(--color-main);
      }

      &--error svg {
        fill: var(--color-error);
      }
    }

    &__stroke {
      & svg {
        stroke: var(--color-main);
      }

      &--error svg {
        stroke: var(--color-error);
      }
    }

    &__both {
      & svg {
        fill: var(--color-main);
        stroke: var(--color-main);
      }

      &--error svg {
        fill: var(--color-error);
        stroke: var(--color-error);
      }
    }
  }
</style>
