<template>
  <div :class="baseClass" :id="baseClass">
    <div :class="[`${baseClass}__wrapper`]">
      <section :class="`${baseClass}__menu ${baseClass}__menu--left`">
        <icon-button @click="$emit('clickMenu')" icon="menu" />
      </section>
      <section :class="`${baseClass}__menu ${baseClass}__menu--center`">
        <svg-icon :src="require('../../assets/media/icons/logo.svg')" size="large" />
      </section>
      <section :class="`${baseClass}__menu ${baseClass}__menu--right`">
        <icon-button icon="search" />
        <icon-button
          @click="$emit('clickUser')"
          :class="`${baseClass}__icon ${baseClass}__icon--user`"
          icon="user"
        />
        <icon-button @click="$emit('clickShoppingCart')" icon="shoppingCart" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { IconButton, SvgIcon } from '../icons';

  const baseClass = 'header';

  defineEmits(['clickUser', 'clickShoppingCart', 'clickMenu']);

  window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 0) {
      header?.classList.add(`${baseClass}--scrolled`);
    } else {
      header?.classList.remove(`${baseClass}--scrolled`);
    }
  });
</script>

<style scoped lang="scss">
  .header {
    position: fixed;
    width: 100%;
    transition: background-color 0.3s ease;

    &--scrolled {
      border-radius: 20px;
      width: 98%;
      margin: 4px 1rem;
      background-color: var(--color-primary);
      box-shadow: var(--shadow-button);
      z-index: 1;
    }

    &__wrapper {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      height: 5rem;
      padding: 0 2rem;
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
