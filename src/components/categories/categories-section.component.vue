<template>
  <section
    :class="[baseClass, { [`${baseClass}--shadow`]: haveShadow }]"
    :style="{ backgroundImage: `url(${image})` }"
  >
    <base-button
      @click="$emit('navigateTo', category)"
      :class="`${baseClass}__button`"
      :text="t('asides.shop.categories') + `${category}`"
      icon="go-to"
      size="large"
      color="white"
      icon-position="right"
      :have-shadow="haveShadow"
    />
  </section>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';

  import { BaseButton } from '../inputs';

  const baseClass = 'categories-section';

  defineProps({
    category: {
      type: String,
      required: true
    },
    image: String,
    haveShadow: Boolean
  });

  const { t } = useI18n();
</script>

<style lang="scss" scoped>
  .categories-section {
    position: relative;
    width: 340px;
    height: 177px;
    border-radius: 16px;

    &--shadow {
      box-shadow: var(--shadow-section);
    }

    &__button {
      position: absolute;
      bottom: 22px;
      right: 18px;
    }
  }
</style>
