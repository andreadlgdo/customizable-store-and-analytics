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
          {{ isSubmenuOpen ? t('menus.general.backToMenu') : t('menus.general.mobile.login') }}
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
  import { MenuItem } from '../../interfaces';
  import { generalService } from '../../services';

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

  const { parentCategories, loadCategories, getOneCategory, getChildrenByParent } = useCategories();

  const { t } = useI18n();

  const { isMobileAndTable } = useMobile();

  const router = useRouter();

  const isSubmenuOpen = ref(false);
  const isWithSubCaterogies = ref(false);

  const subMenuSelected = ref<MenuItem[]>();

  const sectionsImages = ref();

  const menuCategories = computed(() => {
    return parentCategories.value?.map(category => {
      const children = getChildrenByParent(category.title);
      return {
        id: parseInt(category._id ?? ''),
        label: category.title,
        image: getOneCategory(category.title)?.imageUrl,
        route: { name: 'Products', params: { category: category.title } },
        subItem: children?.map(c => ({
          id: parseInt(c._id ?? ''),
          label: c.title,
          route: { name: 'Products', params: { category: c.title } }
        }))
      };
    });
  });

  const menuElements = computed((): MenuItem[] => [
    { id: 1, label: t('menus.general.items.home'), route: { name: 'Home' } },
    {
      id: 2,
      label: t('menus.general.items.shop.title'),
      subItem: [
        {
          id: 21,
          label: t('menus.general.items.shop.seeAll'),
          image: sectionsImages.value?.[0]?.imageUrl,
          route: { name: 'Products' }
        },
        ...(menuCategories.value ?? [])
      ]
    },
    { id: 3, label: t('menus.general.items.contact') },
    { id: 4, label: t('menus.general.items.about') },
    { id: 5, label: t('menus.general.items.faq') }
  ]);

  const clickItem = (item: MenuItem) => {
    if (item.route) {
      router.push(item.route);
      emit('close');
    } else if (item.subItem) {
      clickSubItem(item);
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
    sectionsImages.value = await generalService.getSectionsImages();
  });
</script>

<style lang="scss" scoped>
  .menu-aside {
    display: flex;
    flex-direction: column;
    padding: 6rem 2rem;
    height: 100vh;
    overflow-y: scroll;

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
      font-size: 1rem;
      font-weight: 400;

      &:hover {
        font-weight: bold;
      }
    }
  }
</style>
