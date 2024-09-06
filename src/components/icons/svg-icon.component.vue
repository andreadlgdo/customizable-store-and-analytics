<template>
  <div
    :class="[baseClass, `${baseClass}--${size}`, { [`${baseClass}--${colorAttribute}`]: colorAttribute }]"
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
    }
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
      width: 1rem;
      height: 1rem;
    }

    &--small svg {
      width: 1.2rem;
      height: 1.2rem;
    }

    &--normal svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    &--large svg {
      width: 2rem;
      height: 2rem;
    }

    &--fill svg {
      fill: var(--color-main);
    }

    &--stroke svg {
      stroke: var(--color-main);
    }

    &--both svg {
      fill: var(--color-main);
      stroke: var(--color-main);
    }
  }
</style>
