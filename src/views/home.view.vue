<template>
  <Header @clickUser="isLogInAsideOpen = true" />
  <theme-toggle />
  <language-toggle />
  <LogInAside
    @close="closeAllAsides"
    @openSignUpAsideOpen="openSignUpAsideOpen"
    :isOpen="isLogInAsideOpen"
  />
  <SignUpAside
    @close="closeAllAsides"
    @openLogInAsideOpen="openLogInAsideOpen"
    :isOpen="isSignUpAsideOpen"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import LogInAside from '../components/asides/log-in-aside.component.vue';
  import SignUpAside from '../components/asides/sign-up-aside.component.vue';

  import ThemeToggle from '../components/toggles/theme-toggle.component.vue';
  import LanguageToggle from '../components/toggles/language-toggle.component.vue';

  import Header from '../components/header.component.vue';

  const isLogInAsideOpen = ref(false);
  const isSignUpAsideOpen = ref(false);

  const openSignUpAsideOpen = () => {
    isLogInAsideOpen.value = false;
    isSignUpAsideOpen.value = true;
  };

  const openLogInAsideOpen = () => {
    isLogInAsideOpen.value = true;
    isSignUpAsideOpen.value = false;
  };

  const closeAllAsides = () => {
    isLogInAsideOpen.value = false;
    isSignUpAsideOpen.value = false;
  };
</script>

<style lang="scss" scoped></style>
