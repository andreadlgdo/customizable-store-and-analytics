<template>
  <Aside @close="$emit('close')" :is-open="isOpen">
    <div :class="baseClass">
      <div :class="`${baseClass}__title`">
        <p :class="`${baseClass}__text ${baseClass}__text--title`">
          {{ t('userAsides.userMenu.title') }}
        </p>
        <p :class="`${baseClass}__text ${baseClass}__text--subtitle`">
          {{ user.username.toUpperCase() ?? '' }}
        </p>
      </div>
      <hr />
      <menu-items :menu-items="menuElements" />
    </div>
  </Aside>
</template>

<script lang="ts" setup>
  import { onMounted, PropType } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { User } from '../../interfaces/user';

  import Aside from '../asides/aside.component.vue';
  import MenuItems from '../menu/menu-items.component.vue';

  const baseClass = 'menu-admin-aside';

  const { t } = useI18n();

  const props = defineProps({
    isOpen: Boolean,
    user: {
      type: Object as PropType<User>,
      required: true
    }
  });

  const menuElements =
    props.user.type !== 'admin'
      ? [
          { label: t('userAsides.userMenu.items.client.label1') },
          { label: t('userAsides.userMenu.items.client.label2') },
          { label: t('userAsides.userMenu.items.client.label3') },
          { label: t('userAsides.userMenu.items.client.label4') }
        ]
      : [
          { label: t('userAsides.userMenu.items.admin.label1') },
          { label: t('userAsides.userMenu.items.admin.label2') },
          { label: t('userAsides.userMenu.items.admin.label3') },
          { label: t('userAsides.userMenu.items.admin.label4') },
          { label: t('userAsides.userMenu.items.admin.label5') },
          { label: t('userAsides.userMenu.items.admin.label6') }
        ];
</script>

<style lang="scss" scoped>
  .menu-admin-aside {
    display: flex;
    flex-direction: column;
    margin: 0 46px;

    &__title {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
    }

    &__text {
      &--title {
        font-size: 56px;
        font-weight: 400;
      }

      &--subtitle {
        line-height: 52px;
        font-size: 70px;
        font-weight: 700;
      }
    }
  }
</style>
