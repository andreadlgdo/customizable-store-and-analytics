<template>
  <UiAside
    @click="$emit('close')"
    :class="baseClass"
    :is-open="isOpen"
    icon="close"
    position="left"
    fixed
  >
    <div :class="`${baseClass}__content`">
      <div v-if="isSubmenuOpen" @click="isSubmenuOpen = false" :class="`${baseClass}__action`">
        <UiIcon
          :src="require(`../../assets/media/icons/go-to.svg`)"
          :class="`${baseClass}__icon`"
          size="small"
        />
        <p :class="`${baseClass}__text`">{{ t('menus.general.backToMenu') }}</p>
      </div>
      <UiHierarchicalList
        @clickItem="clickItem"
        @clickSubItem="clickSubItem"
        :items="isSubmenuOpen ? subMenuSelected : menuElements"
        :expansible="isSubmenuOpen"
      />
    </div>
  </UiAside>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  import { useCategories } from '@/composables';
  import { MenuItem } from '@/interfaces';
  import { generalService } from '@/services';

  import UiAside from '@/components/shared/ui-aside.component.vue';
  import UiIcon from '@/components/shared/ui-icon.component.vue';
  import UiHierarchicalList from '@/components/shared/ui-hierarchical-list.component.vue';

  const baseClass = 'ui-menu';

  defineProps({
    isOpen: Boolean
  });

  const emit = defineEmits(['close']);

  const { parentCategories, loadCategories, getChildrenByParent } = useCategories();
  const { t } = useI18n();
  const router = useRouter();

  const sectionsImages = ref();

  const isSubmenuOpen = ref(false);
  const isWithSubCaterogies = ref(false);
  const subMenuSelected = ref<MenuItem[]>();

  const menuCategories = computed(() => {
    return parentCategories.value?.map(category => {
      const children = getChildrenByParent(category.title);
      return {
        id: parseInt(category._id ?? ''),
        label: category.title,
        image: category.imageUrl ?? '',
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
    { id: 3, label: t('menus.general.items.contact'), route: { name: 'Contact' } },
    { id: 4, label: t('menus.general.items.about'), route: { name: 'About' } },
    { id: 5, label: t('menus.general.items.faq'), route: { name: 'Questions and answers' } }
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

  onMounted(async () => {
    await loadCategories();
    sectionsImages.value = await generalService.getSectionsImages();
  });
</script>

<style lang="scss" scoped>
  .ui-menu {
    width: 360px;

    &__action {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 1rem;
      cursor: pointer;
    }

    &__icon {
      transform: rotate(180deg);
    }

    &__text {
      &:hover {
        font-weight: bold;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      padding: 6rem 2rem;
      height: 100vh;
    }
  }
</style>
