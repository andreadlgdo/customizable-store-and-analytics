<template>
  <div :class="[baseClass, `${baseClass}--${size}`]" v-html="svgContent"></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch, PropType } from 'vue';

  import { SizeType } from '../../types';

  const baseClass = 'ui-icon';

  const props = defineProps({
    src: {
      type: String,
      required: true
    },
    size: {
      type: String as PropType<SizeType>,
      default: 'normal'
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
  .ui-icon {
    display: flex;
    justify-content: center;
    align-items: center;

    &--normal {
      height: 28px;
      width: 28px;
    }

    &--small {
      height: 20px;
      width: 20px;
    }
  }
</style>
