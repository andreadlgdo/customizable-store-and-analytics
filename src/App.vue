<template>
  <div :class="['app', routeClass]">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
  import { computed, watch } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const routeClass = computed(() => {
    switch (route.name) {
      case 'PersonalData':
        return 'dashboard';
      case 'UsersManagement':
        return 'dashboard';
      case 'OrdersManagement':
        return 'dashboard';
      case 'UserCart':
        return 'user-cart';
      case 'Analytics':
        return 'dashboard';
      case 'Orders':
        return 'order';
      default:
        return '';
    }
  });

  watch(
    () => route.path,
    newPath => {
      if (newPath.includes('/dashboard')) {
        document.title = 'Dashboard';
      } else {
        document.title = 'KASTO';
      }
    },
    { immediate: true }
  );
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

  .app.order {
    overflow: hidden;
  }

  .app.user-cart {
    overflow-y: hidden;
  }

  .app.personalization {
    overflow: hidden;
  }
</style>
