<template>
  <base-aside
    @close="$emit('close')"
    :is-open="isOpen"
    close-position="left"
    aside-position="left"
    type="round"
  >
    <div :class="baseClass">
      <div
        v-if="isMobile || isSubmenuOpen"
        :class="[
          `${baseClass}__header`,
          [isSubmenuOpen ? `${baseClass}__header--back` : `${baseClass}__header--user`]
        ]"
        @click="isSubmenuOpen ? (isSubmenuOpen = false) : $emit('openLogInAside')"
      >
        <svg-icon
          :src="require(`../../assets/media/icons/${isSubmenuOpen ? 'go-to' : 'user'}.svg`)"
          :size="isSubmenuOpen ? 'small' : 'normal'"
          :class="{ [`${baseClass}__icon`]: isSubmenuOpen }"
        />
        <base-text
          :tag="isSubmenuOpen ? 'default' : 'h4'"
          :class="{ [`${baseClass}__text`]: isSubmenuOpen }"
        >
          {{ isSubmenuOpen ? t('menus.appMenu.backToMenu') : t('menus.appMenu.mobile.login') }}
        </base-text>
      </div>
      <list-items
        @clickSubItem="clickSubItem"
        :items="isSubmenuOpen ? subMenuSelected : menuElements"
        :expansible="isSubmenuOpen"
      />
      <language-toggle />
    </div>
  </base-aside>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useMobile } from '../../composables';
  import { MenuItem } from '../../interfaces';

  import BaseText from '../base-text.component.vue';
  import { SvgIcon } from '../icons';
  import ListItems from '../list-items.component.vue';
  import { LanguageToggle } from '../toggles';

  import BaseAside from './base-aside.component.vue';

  const baseClass = 'menu-aside';

  defineProps({
    isOpen: Boolean
  });

  defineEmits(['close', 'openLogInAside']);

  const { t } = useI18n();

  const { isMobile } = useMobile();

  const isSubmenuOpen = ref(false);
  const isWithSubCaterogies = ref(false);
  const subMenuSelected = ref<MenuItem[]>();

  const menuElements = computed((): MenuItem[] => [
    { id: 1, label: t('menus.appMenu.items.home') },
    {
      id: 2,
      label: t('menus.appMenu.items.shop.title'),
      subItem: [
        { id: 21, label: t('menus.appMenu.items.shop.subItems.clothes') },
        {
          id: 22,
          label: t('menus.appMenu.items.shop.subItems.accessories.title'),
          subItem: [
            { label: t('menus.appMenu.items.shop.subItems.accessories.subItems.bags') },
            { label: t('menus.appMenu.items.shop.subItems.accessories.subItems.jewelry') }
          ]
        },
        { id: 23, label: t('menus.appMenu.items.shop.subItems.shoes') },
        { id: 24, label: t('menus.appMenu.items.shop.subItems.promotions') }
      ]
    },
    { id: 3, label: t('menus.appMenu.items.contact') },
    { id: 4, label: t('menus.appMenu.items.about') },
    { id: 5, label: t('menus.appMenu.items.faq') }
  ]);

  const clickSubItem = (item: MenuItem) => {
    isSubmenuOpen.value = true;
    if (!subMenuSelected.value) {
      subMenuSelected.value = item.subItem;
      isWithSubCaterogies.value = false;
    } else {
      isWithSubCaterogies.value = true;
    }
  };

  watch(
    () => menuElements.value,
    () => {
      if (subMenuSelected.value) {
        subMenuSelected.value = menuElements.value.flatMap(
          menuElement =>
            menuElement.subItem?.filter(subItem =>
              subMenuSelected.value?.some(itemSelected => itemSelected.id === subItem.id)
            ) || []
        );
      }
    }
  );
</script>

<style lang="scss" scoped>
  .menu-aside {
    display: flex;
    flex-direction: column;
    padding: 6rem 2rem;
    height: 100vh;

    &__header {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;

      &--user {
        padding: 16px;
        border-bottom: 1px solid var(--color-medium);
      }

      &--back {
        padding: 0 16px 8px 16px;
      }
    }

    &__icon {
      transform: rotate(180deg);
    }

    &__text {
      &:hover {
        font-weight: bold;
      }
    }
  }
</style>
