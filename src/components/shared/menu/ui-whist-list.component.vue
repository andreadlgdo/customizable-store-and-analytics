<template>
  <ui-aside @click="$emit('close')" :class="baseClass" :is-open="isOpen" icon="close" fixed>
    {{ products }}
  </ui-aside>
</template>

<script lang="ts" setup>
  import { watch, ref } from 'vue';

  import { useUsers } from '../../../composables';
  import { Product } from '../../../interfaces';
  import { productService } from '../../../services';

  import UiAside from '../ui-aside.component.vue';

  const baseClass = 'ui-whist-list';

  const { user } = useUsers();

  const props = defineProps({
    isOpen: Boolean
  });

  const products = ref<Product[]>([]);

  watch(
    () => props.isOpen,
    async isOpen => {
      if (isOpen) {
        products.value = await productService.findProductByUserId(user.value?._id ?? '');
      }
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .ui-whist-list {
    width: 360px;
  }
</style>
