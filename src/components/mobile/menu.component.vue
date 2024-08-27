<template>
  <Aside @close="$emit('close')" :is-open="isOpen" close-position="left">
    <div :class="baseClass">
      <div :class="`${baseClass}__item ${baseClass}__item--user`">
        <svg-icon :src="require('../../assets/media/icons/user.svg')" color-attribute="stroke" />
        <p
          @click="$emit('clickUserAsideOnMobile')"
          :class="`${baseClass}__text ${baseClass}__text--login`"
        >
          {{ t('mobile.menu.login').toUpperCase() }}
        </p>
      </div>
      <div
        v-for="(menu, index) in menuItems"
        :key="index"
        :class="`${baseClass}__item ${baseClass}__item--menu`"
      >
        <p>{{ menu.label }}</p>
        <svg-icon
          v-if="menu.subMenu.length"
          :src="require('../../assets/media/icons/arrow-right.svg')"
          color-attribute="fill"
          size="mini"
        />
      </div>
    </div>
  </Aside>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { MenuItem } from '../../interfaces/menuItem';

  import Aside from '../asides/aside.component.vue';
  import SvgIcon from '../icons/svg-icon.component.vue';

  const baseClass = 'menu';

  const { t } = useI18n();

  defineProps({
    isOpen: Boolean,
    menuItems: {
      type: Array as PropType<Array<MenuItem>>,
      default: () => []
    }
  });

  defineEmits(['close', 'clickUser']);
</script>

<style lang="scss" scoped>
  .menu {
    display: flex;
    flex-direction: column;
    margin: 26px 46px;

    &__item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--color-medium);
      padding: 1rem 1.5rem;

      &--user {
        gap: 0.5rem;
      }

      &--menu {
        justify-content: space-between;
      }
    }

    &__text {
      &--login {
        font-weight: bold;
      }
    }
  }
</style>
