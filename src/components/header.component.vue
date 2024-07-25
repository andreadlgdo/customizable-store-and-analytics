<template>
  <div :class="baseClass">
    <div :class="`${baseClass}__menu ${baseClass}__menu--mobile`">
      <icon-button :class="`${baseClass}__icon ${baseClass}__icon--menu`" icon="menu" />
    </div>
    <section :class="`${baseClass}__menu ${baseClass}__menu--left`">
      <h1>LOGO</h1>
      <div :class="`${baseClass}__menu ${baseClass}__menu--options`">
        <span :class="`${baseClass}__text ${baseClass}__text--menu`">Menu 1</span>
        <span :class="`${baseClass}__text ${baseClass}__text--menu`">Menu 1</span>
        <span :class="`${baseClass}__text ${baseClass}__text--menu`">Menu 1</span>
      </div>
    </section>
    <section :class="`${baseClass}__menu ${baseClass}__menu--right`">
      <icon-button :class="`${baseClass}__icon ${baseClass}__icon--search`" icon="search" />
      <icon-button
        :class="`${baseClass}__icon ${baseClass}__icon--shoppingCart`"
        icon="shoppingCart"
      />
      <icon-button :class="`${baseClass}__icon ${baseClass}__icon--user`" icon="user" />
    </section>
  </div>
</template>

<script setup lang="ts">
  import IconButton from './icon-button.component.vue';

  const baseClass = 'header';
</script>

<style scoped lang="scss">
  .header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 5rem;
    box-shadow: var(--shadow-header);
    padding: 0 2rem;

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
      &--menu {
        font-size: var(--font-size--large);
      }
    }

    @media only screen and (max-width: 768px) {
      grid-template-columns: 1fr 1fr 1fr;

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
