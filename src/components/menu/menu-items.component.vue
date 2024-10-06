<template>
  <div v-for="(menu, index) in menuItems" :key="index">
    <transition :name="baseClass" appear>
      <div v-if="!isSubmenuOpen" :class="`${baseClass}__item ${baseClass}__item--menu`">
        <div :class="`${baseClass}__item-text`">
          <p :class="`${baseClass}__text ${baseClass}__text--menu`">{{ menu.label }}</p>
          <p v-if="showDescription" :class="`${baseClass}__text ${baseClass}__text--description`">
            {{ menu.description }}
          </p>
        </div>
        <svg-icon
          v-if="menu.subMenu?.length"
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
          <p :class="`${baseClass}__text ${baseClass}__text--submenu`">
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
    </transition>
  </div>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';

  import { MenuItem } from '../../interfaces/menuItem';

  import SvgIcon from '../icons/svg-icon.component.vue';

  const baseClass = 'menu-items';

  const isSubmenuOpen = ref(false);

  defineProps({
    menuItems: {
      type: Array as PropType<Array<MenuItem>>,
      default: () => []
    },
    showDescription: Boolean
  });

  defineEmits(['clickUser']);
</script>

<style lang="scss" scoped>
  .menu-items {
    &-enter-active {
      animation: fade-in-left 1s ease-out both;
    }

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

    &__item-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    &__text {
      font-size: 20px;

      &--menu {
        cursor: pointer;

        &:hover {
          font-weight: bold;
        }
      }

      &--description {
        font-size: 14px;
      }

      &--submenu {
        font-weight: bold;
      }
    }

    &__icon {
      transform: rotate(180deg);
    }
  }
</style>
