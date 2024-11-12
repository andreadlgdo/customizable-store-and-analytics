<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
  @import 'assets/sass/styles';
  @import 'assets/sass/fonts';
  @import 'assets/sass/colors';

  .app {
    height: 100%;
    background: var(--bg-main);
    color: var(--color-main);
  }
</style>
