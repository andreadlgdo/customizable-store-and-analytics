<template>
  <button @click="toggleTheme">
    {{ theme === 'dark' ? 'Light Mode' : 'Dark Mode' }}
  </button>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';

  const theme = ref(localStorage.getItem('theme') || 'light');
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme.value);
    localStorage.setItem('theme', theme.value);
  };

  onMounted(() => {
    document.documentElement.setAttribute('data-theme', theme.value);
  });
</script>

<style scoped lang="scss"></style>
