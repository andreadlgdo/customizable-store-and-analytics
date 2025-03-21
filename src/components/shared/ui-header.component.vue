<template>
  <section :class="baseClass">
    <UiIconButton
      @click="$emit('openMenu')"
      icon="menu"
      :class="`${baseClass}__icon ${baseClass}__icon--menu`"
    />
    <h1 @click="router.push('/')" :class="`${baseClass}__text`">KASTO</h1>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--actions`">
      <UiIconButton @click="$emit('openUserMenu')" icon="user" />
      <UiIconButton @click="$emit('openWhistList')" icon="heart" />
      <UiIconButton @click="$emit('openShoppingCart')" icon="shoppingCart" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  import UiIconButton from './ui-icon-button.component.vue';

  const baseClass = 'ui-header';

  const router = useRouter();

  defineEmits(['openMenu', 'openUserMenu', 'openWhistList', 'openShoppingCart']);
</script>

<style lang="scss" scoped>
  .ui-header {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    padding: 0 2rem;
    height: 5rem;
    width: 100%;
    background: var(--color-soft-primary);

    &__icon {
      &--menu {
        justify-content: flex-start;
      }
    }

    &__text {
      align-self: center;
      font-size: 32px;
      font-weight: bold;
      cursor: pointer;
    }

    &__wrapper {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
  }
</style>
