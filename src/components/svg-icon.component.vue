<template>
  <div
    :class="[`${baseClass}--${size}`, { [`${baseClass}--${colorAttribute}`]: colorAttribute }]"
    v-html="svgContent"
  ></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, PropType } from 'vue';
  import { SizeType } from '@/types/size.type';

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
      type: String, //fill, stroke and both
      default: undefined
    }
  });

  const svgContent = ref('');

  onMounted(async () => {
    const response = await fetch(props.src);
    svgContent.value = await response.text();
  });
</script>

<style lang="scss">
  .svg-icon {
    &--small svg {
      width: 1rem;
      height: 1rem;
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
