<template>
  <ui-aside @click="$emit('close')" :class="baseClass" :is-open="isOpen" icon="close" fixed>
    <p :class="`${baseClass}__text ${baseClass}__text--title`">{{ t('asides.whistList.title') }}</p>
    <section v-if="products.length" :class="`${baseClass}__content`">
      <div v-for="product in products" :key="product._id">
        <div :class="`${baseClass}__image`">
          <ui-image :image="product.imageUrl" type="square" />
          <ui-icon-button icon="heartSelected" size="small" :class="` ${baseClass}__icon`" />
        </div>
        {{ product.name }}
      </div>
    </section>
    <section v-else :class="`${baseClass}__wrapper`">
      <p :class="`${baseClass}__text ${baseClass}__text--description`">
        {{ t('asides.whistList.empty.description') }}
      </p>
      <ui-button @click="goToProducts" :text="t('asides.whistList.empty.action')" />
    </section>
  </ui-aside>
</template>

<script lang="ts" setup>
  import { watch, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  import { useUsers } from '../../../composables';
  import { Product } from '../../../interfaces';
  import { productService } from '../../../services';

  import UiAside from '../ui-aside.component.vue';
  import UiImage from '../ui-image.component.vue';
  import UiIconButton from '../ui-icon-button.component.vue';
  import UiButton from '../ui-button.component.vue';

  const baseClass = 'ui-whist-list';

  const { user } = useUsers();
  const router = useRouter();
  const { t } = useI18n();

  const props = defineProps({
    isOpen: Boolean
  });

  const emit = defineEmits(['close']);

  const products = ref<Product[]>([]);

  const goToProducts = () => {
    router.push('/products');
    emit('close');
  };

  watch(
    () => props.isOpen,
    async isOpen => {
      if (isOpen) {
        products.value = await productService.findProductByUserId(user.value?._id ?? '');
      }
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .ui-whist-list {
    width: 400px;
    padding: 2rem;

    &__content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

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

    &__image {
      position: relative;
    }

    &__icon {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 8px;
      border-radius: 50px;

      &:hover {
        background-color: var(--bg-red);
      }
    }
  }
</style>
