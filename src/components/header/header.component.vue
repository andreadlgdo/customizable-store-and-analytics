<template>
  <div :class="baseClass">
    <div
      :class="[`${baseClass}__wrapper`, { [`${baseClass}__wrapper--search-box`]: isOpenSearchBox }]"
    >
      <section :class="`${baseClass}__menu ${baseClass}__menu--left`">
        <icon-button @click="$emit('clickMenu')" icon="menu" color-attribute="stroke" />
      </section>
      <section :class="`${baseClass}__menu ${baseClass}__menu--center`">
        <svg-icon
          :src="require('../../assets/media/icons/logo.svg')"
          color-attribute="both"
          size="large"
        />
      </section>
      <section :class="`${baseClass}__menu ${baseClass}__menu--right`">
        <icon-button
          @click="isOpenSearchBox = !isOpenSearchBox"
          icon="search"
          color-attribute="fill"
        />
        <icon-button
          @click="$emit('clickUser')"
          :class="`${baseClass}__icon ${baseClass}__icon--user`"
          icon="user"
          color-attribute="stroke"
        />
        <icon-button
          @click="$emit('clickShoppingCart')"
          icon="shoppingCart"
          color-attribute="fill"
        />
      </section>
    </div>
    <transition name="header">
      <header-search v-if="isOpenSearchBox" />
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import IconButton from '../icons/icon-button.component.vue';
  import SvgIcon from '../icons/svg-icon.component.vue';

  import HeaderSearch from './header-search.component.vue';

  const baseClass = 'header';

  const isOpenSearchBox = ref(false);

  defineEmits(['clickUser', 'clickShoppingCart', 'clickMenu']);
</script>

<style scoped lang="scss">
  .header {
    position: absolute;
    width: 100%;

    &__wrapper {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      height: 5rem;
      padding: 0 2rem;

      &--search-box {
        box-shadow: var(--shadow-header-search-box);
      }
    }

    &__menu {
      display: flex;
      align-items: center;

      &--left {
        justify-content: flex-start;
      }

      &--right {
        justify-content: flex-end;
        gap: 1.5rem;
      }
    }

    &-enter-active {
      animation: fade-in-top 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    }

    &-leave-active {
      animation: fade-out-top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }

    @media only screen and (max-width: 768px) {
      &__wrapper {
        padding: 0 1rem;
      }

      &__menu {
        display: flex;

        &--right {
          justify-content: flex-end;
          gap: 1rem;
        }
      }

      &__icon {
        &--user {
          display: none;
        }
      }
    }
  }
</style>
