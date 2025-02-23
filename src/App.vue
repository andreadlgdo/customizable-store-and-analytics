<template>
  <div :class="['app', routeClass]">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const routeClass = computed(() => {
    switch (route.name) {
      case 'PersonalData':
        return 'dashboard';
      case 'ProductsManagement':
        return 'dashboard';
      case 'UsersManagement':
        return 'dashboard';
      default:
        return '';
    }
  });
</script>

<style lang="scss">
  @import 'assets/sass/styles';
  @import 'assets/sass/fonts';
  @import 'assets/sass/colors';

  .app {
    height: 100%;
    background: var(--bg-main);
    color: var(--color-main);
  }

  .app.dashboard * {
    overflow: hidden;
  }
</style>
