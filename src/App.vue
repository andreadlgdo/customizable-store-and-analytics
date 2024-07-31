<template>
  <div class="app" v-if="true">
    <Header @clickUser="openUserAside" />
    <ThemeToggle />
    <Aside @close="closeUserAside" :isOpen="isAsideOpen" />
  </div>
  <div class="app" v-else>
    <Library />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import Header from './components/header.component.vue';
  import Aside from './components/aside.component.vue';
  import ThemeToggle from './components/toggles/theme-toggle.component.vue';
  import Library from './views/library.view.vue';

  const isAsideOpen = ref(false);

  const openUserAside = () => {
    isAsideOpen.value = true;
  };

  const closeUserAside = () => {
    isAsideOpen.value = false;
  };
</script>

<style lang="scss">
  @import 'assets/sass/styles';
  @import 'assets/sass/fonts';
  @import 'assets/sass/colors';

  .app {
    height: 100%;
    background: var(--bg-main);
    color: var(--color-main);
    overflow: auto;
  }
</style>
