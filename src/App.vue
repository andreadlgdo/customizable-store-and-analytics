<template>
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  <p>{{ t('test') }}</p>
  <select v-model="$i18n.locale">
    <option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale">
      {{ locale }}
    </option>
  </select>
</template>

<script lang="ts" setup>
  import HelloWorld from './components/HelloWorld.vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>

<style lang="scss">
  @import 'assets/sass/fonts';
</style>
