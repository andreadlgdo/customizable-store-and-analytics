<template>
  <div :class="['app', routeClass]">
    <router-view />
    <UiFooter v-if="routeClass !== 'dashboard' && routeClass !== 'dashboard-user' && routeClass !== 'product-details'" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, watch } from 'vue';
  import { useRoute } from 'vue-router';

  import UiFooter from './components/shared/ui-footer.component.vue';

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
        return 'dashboard-user';
      case 'UserWhistList':
        return 'dashboard-user';
      case 'Analytics':
        return 'dashboard';
      case 'Products':
        return 'dashboard';
      case 'Personalization':
        return 'dashboard-user';
      case 'Orders':
        return 'order';
      case 'ProductDetails':
        return 'product-details';
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

  .app.dashboard-user {
    overflow-y: hidden;
  }

  .app.personalization {
    overflow: hidden;
  }
</style>
