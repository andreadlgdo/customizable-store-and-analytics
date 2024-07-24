<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <ThemeToggle />
  </div>

  <p>{{ t('test') }}</p>
  <select v-model="$i18n.locale">
    <option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale">
      {{ locale }}
    </option>
  </select>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import ThemeToggle from './theme-toggle.component.vue';

  const { t } = useI18n();

  const message = ref('test');
</script>

<style scoped lang="scss">
  .hello {
    background: var(--bg-main);
  }
</style>
