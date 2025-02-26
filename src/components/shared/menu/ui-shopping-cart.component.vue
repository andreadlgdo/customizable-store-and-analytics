<template>
  <ui-aside @click="$emit('close')" :class="baseClass" :is-open="isOpen" icon="close" fixed>
    <p :class="`${baseClass}__text ${baseClass}__text--title`">{{ t('asides.cart.title') }}</p>
    <section v-if="false" :class="`${baseClass}__content`"></section>
    <section v-else :class="`${baseClass}__wrapper`">
      <p :class="`${baseClass}__text ${baseClass}__text--description`">
        {{ t('asides.cart.empty.description') }}
      </p>
      <ui-button @click="goToProducts" :text="t('asides.cart.empty.action')" />
    </section>
  </ui-aside>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  import UiAside from '../ui-aside.component.vue';
  import UiButton from '../ui-button.component.vue';

  const baseClass = 'ui-shopping-cart';

  const router = useRouter();
  const { t } = useI18n();

  defineProps({
    isOpen: Boolean
  });

  const emit = defineEmits(['close']);

  const goToProducts = () => {
    router.push('/products');
    emit('close');
  };
</script>

<style lang="scss" scoped>
  .ui-shopping-cart {
    width: 400px;
    padding: 2rem;

    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2rem;
      height: 84%;
    }

    &__text {
      &--title {
        font-size: 32px;
        font-weight: bold;
        padding-bottom: 2rem;
      }

      &--description {
        font-size: 16px;
        text-align: center;
      }
    }
  }
</style>
