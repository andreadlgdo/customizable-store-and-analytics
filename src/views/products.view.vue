<template>
  <header-layout colored />
  <div :class="baseClass">
    <base-text tag="h3">{{ category.toUpperCase() }}</base-text>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  import { BaseText, Footer } from '../components';

  import HeaderLayout from './header-layout.view.vue';

  const baseClass = 'products';

  const route = useRoute();

  const category = computed<string>(() => route.params.category as string);
</script>

<style lang="scss" scoped>
  .products {
    height: 90%;
    margin: 2rem 3rem;
  }
</style>
