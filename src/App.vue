<template>
  <div class="app">
    <Header />
    <ThemeToggle />
  </div>
</template>

<script lang="ts" setup>
  import Header from './components/header.component.vue';
  import ThemeToggle from './components/toggles/theme-toggle.component.vue';
</script>

<style lang="scss">
  @import 'assets/sass/styles';
  @import 'assets/sass/fonts';
  @import 'assets/sass/colors';

  .app {
    height: 100%;
  }
</style>
