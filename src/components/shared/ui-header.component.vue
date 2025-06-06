<template>
  <section :class="[
    baseClass,
    { [`${baseClass}--transparent`]: transparent && !isScrolled },
    { [`${baseClass}--scrolled`]: isScrolled },
    { [`${baseClass}--fixed`]: fixed }
  ]">
    <UiIconButton
      @click="$emit('openMenu')"
      icon="menu"
      :class="`${baseClass}__icon ${baseClass}__icon--menu`"
    />
    <h1 @click="router.push('/')" :class="[`${baseClass}__text`, { [`${baseClass}__text--disabled`]: disabled }]">{{ name ?? defaultName }}</h1>
    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--actions`">
      <UiIconButton @click="$emit('openUserMenu')" icon="user" />
      <UiIconButton @click="$emit('openWhistList')" icon="heart" />
      <UiIconButton @click="$emit('openShoppingCart')" icon="shoppingCart" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';

  import { customService } from '@/services';

  import UiIconButton from '@/components/shared/ui-icon-button.component.vue';

  const baseClass = 'ui-header';
  const router = useRouter();
  const isScrolled = ref(false);

  defineProps({
    name: {
      type: String,
      default: undefined
    },
    transparent: Boolean,
    fixed: Boolean,
    disabled: Boolean
  });

  defineEmits(['openMenu', 'openUserMenu', 'openWhistList', 'openShoppingCart']);

  const defaultName = ref();

  const handleScroll = () => {
    isScrolled.value = window.scrollY > 0;
  };

  onMounted(async () => {
    const customTexts = await customService.getCustomTexts('home');
    defaultName.value = customTexts.name;
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<style lang="scss" scoped>
  .ui-header {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    padding: 0 2rem;
    height: 5rem;
    width: 100%;
    background: var(--color-soft-primary);
    transition: all 0.3s ease;

    &--fixed {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
    }

    &--transparent {
      z-index: 0;
      background: transparent;
    }

    &--scrolled {
      background: var(--color-primary);
      box-shadow: var(--shadow-soft);
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

      &--disabled {
        pointer-events: none;
        cursor: default;
      }
    }

    &__wrapper {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
  }
</style>
