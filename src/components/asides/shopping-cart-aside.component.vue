<template>
  <Aside @close="$emit('close')" :is-open="isOpen" type="round">
    <template v-slot:header>
      <div :class="`${baseClass}__toggle`">
        <button
          @click="selectedShoppingCart = true"
          :class="[
            `${baseClass}__button ${baseClass}__button--cart`,
            { [`${baseClass}__button--selected`]: selectedShoppingCart }
          ]"
        >
          {{ t('cart.title') }}
        </button>
        <button
          @click="selectedShoppingCart = false"
          :class="[
            `${baseClass}__button ${baseClass}__button--whistlist`,
            { [`${baseClass}__button--selected`]: !selectedShoppingCart }
          ]"
        >
          {{ t('whistList.title') }}
        </button>
      </div>
    </template>
  </Aside>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import Aside from './aside.component.vue';

  const baseClass = 'shopping-cart-aside';

  const { t } = useI18n();

  const selectedShoppingCart = ref(true);

  defineProps({
    isOpen: Boolean
  });

  defineEmits(['close']);
</script>

<style lang="scss" scoped>
  .shopping-cart-aside {
    &__toggle {
      display: flex;
      justify-content: center;
      height: 5rem;
      width: 100%;
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      width: 100%;
      height: 100%;
      padding-top: 4px;
      border: none;
      background: var(--bg-transparent);
      color: var(--color-main);
      cursor: pointer;

      &--cart {
        border-top-left-radius: 50px;
      }

      &--selected {
        background: var(--bg-fill-button);
      }

      &:hover {
        background: var(--bg-fill-button-hover);
      }
    }
  }
</style>
