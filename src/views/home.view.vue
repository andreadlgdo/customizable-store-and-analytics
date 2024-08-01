<template>
  <Header @clickUser="isAsideOpen = true" />
  <theme-toggle />
  <Aside @close="isAsideOpen = false" :isOpen="isAsideOpen" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import ThemeToggle from '../components/toggles/theme-toggle.component.vue';
  import Header from '../components/header.component.vue';
  import Aside from '../components/aside.component.vue';

  const isAsideOpen = ref(false);
</script>

<style lang="scss" scoped></style>
