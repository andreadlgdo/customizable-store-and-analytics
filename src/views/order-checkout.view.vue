<template>
  <div :class="baseClass">
    <div :class="`${baseClass}__header`">
      <ui-icon-button @click="goBack" icon="go-to" :class="`${baseClass}__icon`" />
      <h1 @click="router.push('/')" :class="`${baseClass}__text`">KASTO</h1>
    </div>
    <ui-aside :fixed="false" is-open :class="`${baseClass}__aside`"></ui-aside>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  import UiIconButton from '../components/shared/ui-icon-button.component.vue';
  import UiAside from '../components/shared/ui-aside.component.vue';

  const baseClass = 'order-checkout';
  const router = useRouter();

  const goBack = () => router.go(-1);
</script>

<style lang="scss" scoped>
  .order-checkout {
    display: flex;
    justify-content: space-between;

    &__header {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      height: 5rem;
      width: 100%;
      padding-left: 2rem;
    }

    &__text {
      text-align: center;
      font-size: 32px;
      font-weight: bold;
      cursor: pointer;
    }

    &__icon {
      transform: rotate(180deg);
      border-radius: 50%;
      padding: 8px;

      &:hover {
        background-color: var(--color-soft);
      }
    }

    &__aside {
      padding: 2rem;
      width: 500px;
      background-color: var(--color-soft-primary);
    }
  }
</style>
