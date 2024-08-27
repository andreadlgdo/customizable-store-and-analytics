<template>
  <Aside @close="$emit('close')" :is-open="isOpen" close-position="left">
    <div :class="baseClass">
      <div v-if="!isSubmenuOpen" :class="`${baseClass}__item ${baseClass}__item--user`">
        <svg-icon :src="require('../../assets/media/icons/user.svg')" color-attribute="stroke" />
        <p
          @click="$emit('clickUserAsideOnMobile')"
          :class="`${baseClass}__text ${baseClass}__text--login`"
        >
          {{ t('mobile.menu.login').toUpperCase() }}
        </p>
      </div>
      <div v-for="(menu, index) in menuItems" :key="index">
        <div v-if="!isSubmenuOpen" :class="`${baseClass}__item ${baseClass}__item--menu`">
          <p>{{ menu.label }}</p>
          <svg-icon
            v-if="menu.subMenu.length"
            @click="isSubmenuOpen = true"
            :src="require('../../assets/media/icons/arrow.svg')"
            color-attribute="fill"
            size="mini"
          />
        </div>
        <div v-else>
          <div v-if="menu.subMenu.length" :class="`${baseClass}__item ${baseClass}__item--user`">
            <svg-icon
              @click="isSubmenuOpen = false"
              :class="`${baseClass}__icon`"
              :src="require('../../assets/media/icons/arrow.svg')"
              color-attribute="fill"
              size="small"
            />
            <p :class="`${baseClass}__text ${baseClass}__text--login`">
              {{ menu.label.toUpperCase() }}
            </p>
          </div>
          <div
            v-for="(category, index) in menu.subMenu"
            :key="index"
            :class="`${baseClass}__item ${baseClass}__item--submenu`"
          >
            <p>{{ category }}</p>
          </div>
        </div>
      </div>
    </div>
  </Aside>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { MenuItem } from '../../interfaces/menuItem';

  import Aside from '../asides/aside.component.vue';
  import SvgIcon from '../icons/svg-icon.component.vue';

  const baseClass = 'menu';

  const { t } = useI18n();

  const isSubmenuOpen = ref(false);

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

    &__icon {
      transform: rotate(180deg);
    }
  }
</style>
