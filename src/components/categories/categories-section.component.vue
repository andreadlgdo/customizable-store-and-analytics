<template>
  <section
    :class="[baseClass, `${baseClass}--${size}`, { [`${baseClass}--shadow`]: haveShadow }]"
    :style="{ backgroundImage: `url(${image})` }"
  >
    <base-button
      v-if="text"
      @click="router.push({ name: 'Products', params: { category: text.toLowerCase() } })"
      :class="`${baseClass}__button`"
      :text="t('asides.shoppingCart.categories') + `${text}`"
      icon="go-to"
      size="large"
      color="white"
      icon-position="right"
      :have-shadow="haveShadow"
    />
  </section>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  import { SizeType } from '../../types';

  import { BaseButton } from '../inputs';

  const baseClass = 'categories-section';

  defineProps({
    text: {
      type: String,
      required: true
    },
    size: {
      type: String as PropType<SizeType>,
      default: 'normal'
    },
    image: String,
    haveShadow: Boolean
  });

  const { t } = useI18n();

  const router = useRouter();
</script>

<style lang="scss" scoped>
  .categories-section {
    position: relative;
    border-radius: 16px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &--small {
      width: 340px;
      height: 177px;
    }

    &--large {
      width: auto;
      height: 350px;
    }

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
