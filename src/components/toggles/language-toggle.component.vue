<template>
  <section :class="baseClass">
    <base-text
      @click="locale = language.value"
      v-for="language in languages"
      :key="language.value"
      tag="small"
      :class="[
        `${baseClass}__text`,
        { [`${baseClass}__text--selected`]: locale === language.value }
      ]"
    >
      {{ language.label }}
    </base-text>
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseText from '../base-text.component.vue';

  const baseClass = 'language-toggle';

  const { t, locale, availableLocales } = useI18n();

  const languages = ref(
    availableLocales.map(locale => ({
      label: t(`languages.${locale}`),
      value: locale
    }))
  );
</script>

<style lang="scss" scoped>
  .language-toggle {
    display: flex;
    gap: 12px;
    padding: 8px;

    &__text {
      cursor: pointer;

      &--selected {
        text-decoration: underline;
      }

      &:hover {
        font-weight: bold;
      }
    }
  }
</style>
