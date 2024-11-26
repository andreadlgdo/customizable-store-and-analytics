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
        v-if="isMobileAndTable || isSubmenuOpen"
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
        @clickItem="clickItem"
        @clickSubItem="clickSubItem"
        :items="isSubmenuOpen ? subMenuSelected : menuElements"
        :expansible="isSubmenuOpen"
      />
      <language-toggle />
    </div>
  </base-aside>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  import { useCategories, useMobile } from '../../composables';
  import { CategoryEnum } from '../../enums';
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

  const emit = defineEmits(['close', 'openLogInAside']);

  const { loadCategories, getOneCategory } = useCategories();

  const { t } = useI18n();

  const { isMobileAndTable } = useMobile();

  const router = useRouter();

  const isSubmenuOpen = ref(false);
  const isWithSubCaterogies = ref(false);
  const subMenuSelected = ref<MenuItem[]>();

  const menuElements = computed((): MenuItem[] => [
    { id: 1, label: t('menus.appMenu.items.home') },
    {
      id: 2,
      label: t('menus.appMenu.items.shop.title'),
      subItem: [
        {
          id: 21,
          label: t('menus.appMenu.items.shop.subItems.clothes'),
          image: getOneCategory(CategoryEnum.CLOTHES)?.imageUrl
        },
        {
          id: 22,
          label: t('menus.appMenu.items.shop.subItems.accessories.title'),
          image: getOneCategory(CategoryEnum.BAGS)?.imageUrl,
          subItem: [
            {
              id: 221,
              label: t('menus.appMenu.items.shop.subItems.accessories.subItems.bags')
            },
            { id: 222, label: t('menus.appMenu.items.shop.subItems.accessories.subItems.jewelry') }
          ]
        },
        {
          id: 23,
          label: t('menus.appMenu.items.shop.subItems.shoes'),
          image: getOneCategory(CategoryEnum.SHOES)?.imageUrl
        },
        {
          id: 24,
          label: t('menus.appMenu.items.shop.subItems.promotions'),
          image: getOneCategory(CategoryEnum.PROMOTION)?.imageUrl
        }
      ]
    },
    { id: 3, label: t('menus.appMenu.items.contact') },
    { id: 4, label: t('menus.appMenu.items.about') },
    { id: 5, label: t('menus.appMenu.items.faq') }
  ]);

  const clickItem = (item: MenuItem) => {
    if (isSubmenuOpen.value) {
      router.push({ name: 'Products', params: { category: item.label } });
      emit('close');
    }
  };

  const clickSubItem = (item: MenuItem) => {
    isSubmenuOpen.value = true;
    subMenuSelected.value = item.subItem ?? [];
    isWithSubCaterogies.value = !!item.subItem;
  };

  watch(
    () => menuElements.value,
    () => {
      if (subMenuSelected.value) {
        subMenuSelected.value = menuElements.value.flatMap(
          menuElement =>
            menuElement.subItem?.find(subItem =>
              subMenuSelected.value?.some(itemSelected => itemSelected.id === subItem.id)
            ) || []
        );
      }
    }
  );

  onMounted(async () => {
    await loadCategories();
  });
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
