<template>
  <div :class="baseClass" v-html="svgContent"></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch } from 'vue';

  const baseClass = 'ui-icon';

  const props = defineProps({
    src: {
      type: String,
      required: true
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
    height: 28px;
    width: 28px;
  }
</style>
