<template>
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  <p>{{ test }}</p>
</template>

<script lang="ts" setup>
  import HelloWorld from './components/HelloWorld.vue';
  import { ref } from 'vue';

  const test = ref('a');
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
