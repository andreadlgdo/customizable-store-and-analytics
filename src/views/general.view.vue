<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <ThemeToggle />
  </div>

  <p>{{ t('test') }}</p>
  <LanguageToggle />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import ThemeToggle from '../components/toggles/theme-toggle.component.vue';
  import LanguageToggle from '../components/toggles/language-toggle.component.vue';

  const { t } = useI18n();

  const message = ref('test');
</script>

<style scoped lang="scss">
  .hello {
    background: var(--bg-main);
  }
</style>
