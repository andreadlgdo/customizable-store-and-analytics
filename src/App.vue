<template>
  <div class="app">
    <Header />
  </div>
</template>

<script lang="ts" setup>
  import Header from './components/header.component.vue';
</script>

<style lang="scss">
  @import 'assets/sass/styles';
  @import 'assets/sass/fonts';
  @import 'assets/sass/colors';

  .app {
    height: 100%;
  }
</style>
