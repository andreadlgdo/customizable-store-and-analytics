<template>
  <div :class="baseClass">
    <div
      :class="[`${baseClass}__wrapper`, { [`${baseClass}__wrapper--search-box`]: isOpenSearchBox }]"
    >
      <div :class="`${baseClass}__menu ${baseClass}__menu--mobile`">
        <icon-button
          @click="$emit('clickMenu')"
          :class="`${baseClass}__icon ${baseClass}__icon--menu`"
          icon="menu"
          color-attribute="stroke"
        />
      </div>
      <section :class="`${baseClass}__menu ${baseClass}__menu--left`">
        <h1 :class="`${baseClass}__text ${baseClass}__text--logo`">LOGO</h1>
        <div :class="`${baseClass}__menu ${baseClass}__menu--options`">
          <span :class="`${baseClass}__text ${baseClass}__text--menu`">Menu 1</span>
          <span :class="`${baseClass}__text ${baseClass}__text--menu`">Menu 1</span>
          <span :class="`${baseClass}__text ${baseClass}__text--menu`">Menu 1</span>
        </div>
      </section>
      <section :class="`${baseClass}__menu ${baseClass}__menu--right`">
        <icon-button
          @click="isOpenSearchBox = !isOpenSearchBox"
          :class="`${baseClass}__icon ${baseClass}__icon--search`"
          icon="search"
          color-attribute="fill"
        />
        <icon-button
          @click="$emit('clickShoppingCart')"
          :class="`${baseClass}__icon ${baseClass}__icon--shoppingCart`"
          icon="shoppingCart"
          color-attribute="fill"
        />
        <icon-button
          @click="$emit('clickUser')"
          :class="`${baseClass}__icon ${baseClass}__icon--user`"
          icon="user"
          color-attribute="stroke"
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

  import HeaderSearch from './header-search.component.vue';

  const baseClass = 'header';

  const isOpenSearchBox = ref(false);

  defineEmits(['clickUser', 'clickShoppingCart', 'clickMenu']);
</script>

<style scoped lang="scss">
  .header {
    &__wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      height: 5rem;
      padding: 0 2rem;
      box-shadow: var(--shadow-header);

      &--search-box {
        box-shadow: var(--shadow-header-search-box);
      }
    }

    &__menu {
      display: flex;
      align-items: center;

      &--left,
      &--right {
        gap: 1.5rem;
      }

      &--right {
        justify-content: flex-end;
      }

      &--options {
        gap: 1rem;
      }

      &--mobile {
        display: none;
      }
    }

    &__text {
      color: var(--color-main);

      &--menu {
        font-size: var(--font-size--large);
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
        grid-template-columns: 1fr 1fr 1fr;
        padding: 0 1rem;
      }

      &__menu {
        display: flex;

        &--left {
          justify-content: center;
        }

        &--right {
          justify-content: flex-end;
          gap: 0.5rem;
        }

        &--options {
          display: none;
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
