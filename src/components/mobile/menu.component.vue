<template>
  <base-aside @close="$emit('close')" :is-open="isOpen" close-position="left">
    <div :class="baseClass">
      <transition :name="baseClass" appear>
        <div v-if="!isSubmenuOpen" :class="`${baseClass}__item ${baseClass}__item--user`">
          <svg-icon :src="require('../../assets/media/icons/user.svg')" color-attribute="stroke" />
          <p
            @click="$emit('clickUserAsideOnMobile')"
            :class="`${baseClass}__text ${baseClass}__text--login`"
          >
            {{ t('mobile.menu.login').toUpperCase() }}
          </p>
        </div>
      </transition>
      <menu-items :menuItems="menuElements" />
    </div>
  </base-aside>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { BaseAside } from '../asides';
  import { SvgIcon } from '../icons';
  import { MenuItems } from '../menu';

  const baseClass = 'menu';

  const { t } = useI18n();

  const isSubmenuOpen = ref(false);

  // TO DO: Remove when we have menu items from the backend
  const menuElements = [
    { label: 'Home' },
    { label: 'Shop', subMenu: ['Vestidos', 'Cazadoras', 'Camisetas', 'Zapatos'] },
    { label: 'About' },
    { label: 'Contact' }
  ];

  defineProps({
    isOpen: Boolean
  });

  defineEmits(['close', 'clickUserAsideOnMobile']);
</script>

<style lang="scss" scoped>
  .menu {
    display: flex;
    flex-direction: column;
    margin: 26px 46px;

    &-enter-active {
      animation: fade-in-left 1s ease-out both;
    }

    &__item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--color-medium);
      padding: 1rem 1.5rem;
      gap: 0.5rem;
    }

    &__text {
      &--login {
        font-weight: bold;
      }
    }
  }
</style>
