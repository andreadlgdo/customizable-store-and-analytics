<template>
  <select v-model="locale">
    <option
      v-for="locale in availableLocales"
      :key="locale"
      :value="locale"
    >
      {{ locale }}
    </option>
  </select>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale, availableLocales } = useI18n()
</script>
