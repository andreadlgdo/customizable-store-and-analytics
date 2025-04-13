<template>
  <section :class="[baseClass, { [`${baseClass}--transparent`]: transparent }]">
    <UiIconButton
      @click="$emit('openMenu')"
      icon="menu"
      :class="`${baseClass}__icon ${baseClass}__icon--menu`"
    />
    <h1 @click="router.push('/')" :class="`${baseClass}__text`">{{ name }}</h1>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--actions`">
      <UiIconButton @click="$emit('openUserMenu')" icon="user" />
      <UiIconButton @click="$emit('openWhistList')" icon="heart" />
      <UiIconButton @click="$emit('openShoppingCart')" icon="shoppingCart" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  import { customTextsService } from '@/services';

  import UiIconButton from './ui-icon-button.component.vue';

  const baseClass = 'ui-header';

  const router = useRouter();

  defineProps({
    transparent: Boolean
  });

  defineEmits(['openMenu', 'openUserMenu', 'openWhistList', 'openShoppingCart']);

  const name = ref()

  onMounted(async () => {
    const customTexts = await customTextsService.getCustomTexts('home');
    name.value = customTexts[0].texts.name;
  })
</script>

<style lang="scss" scoped>
  .ui-header {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    padding: 0 2rem;
    height: 5rem;
    width: 100%;
    background: var(--color-soft-primary);

    &--transparent {
      position: fixed;
      background: transparent;
    }

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
