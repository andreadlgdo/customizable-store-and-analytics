<template>
  <base-aside
    @close="$emit('close')"
    :is-open="isOpen"
    close-position="left"
    aside-position="left"
    type="round"
  >
    <div :class="baseClass">
      <div v-if="isMobile" :class="`${baseClass}__user`" @click="$emit('openLogInAside')">
        <svg-icon :src="require(`../../assets/media/icons/user.svg`)" />
        <base-text tag="h4">{{ t('menus.appMenu.mobile.login') }}</base-text>
      </div>
      <list-items :items="menuElements" />
    </div>
  </base-aside>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useMobile } from '../../composables';

  import BaseText from '../base-text.component.vue';
  import { SvgIcon } from '../icons';
  import ListItems from '../list-items.component.vue';

  import BaseAside from './base-aside.component.vue';

  const baseClass = 'menu-aside';

  defineProps({
    isOpen: Boolean
  });

  defineEmits(['close', 'openLogInAside']);

  const { t } = useI18n();

  const { isMobile } = useMobile();

  const menuElements = computed(() => [
    { label: t('menus.appMenu.items.home') },
    {
      label: t('menus.appMenu.items.shop.title'),
      subMenu: ['Vestidos', 'Cazadoras', 'Camisetas', 'Zapatos']
    },
    { label: t('menus.appMenu.items.contact') },
    { label: t('menus.appMenu.items.about') },
    { label: t('menus.appMenu.items.faq') }
  ]);
</script>

<style lang="scss" scoped>
  .menu-aside {
    display: flex;
    flex-direction: column;
    padding: 6rem 2rem;
    height: 100vh;

    &__user {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
      border-bottom: 1px solid var(--color-medium);
    }
  }
</style>
