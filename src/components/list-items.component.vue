<template>
  <section v-for="item in items" :key="item.id" :class="baseClass">
    <div :class="`${baseClass}__item`">
      <section :class="`${baseClass}__description`">
        <div
          v-if="item.image"
          :class="`${baseClass}__image`"
          :style="{ backgroundImage: `url(${item.image})` }"
        ></div>
        <base-text tag="h4" :class="`${baseClass}__text ${baseClass}__text--item`">
          {{ item.label }}
        </base-text>
      </section>
      <icon-button
        v-if="item.subItem"
        :icon="expansible ? (isExpand ? 'less' : 'plus') : 'arrow'"
        :size="expansible ? (isExpand ? 'small' : 'normal') : 'small'"
        @click="expansible ? (isExpand = !isExpand) : $emit('clickSubItem', item)"
      />
    </div>
    <transition :name="`${baseClass}__subItem--animation`">
      <div v-if="item.subItem && expansible && isExpand" :class="`${baseClass}__subItem`">
        <base-text
          v-for="(subItem, index) in item.subItem"
          :key="index"
          tag="p"
          :class="`${baseClass}__text ${baseClass}__text--subItem`"
        >
          {{ subItem.label }}
        </base-text>
      </div>
    </transition>
  </section>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';

  import BaseText from './base-text.component.vue';
  import { IconButton } from './icons';

  interface Item {
    id: number;
    label: string;
    description?: string;
    subItem?: Item[];
    image?: string;
  }

  const baseClass = 'list-items';

  defineProps({
    items: {
      type: Array as PropType<Item[]>,
      required: true
    },
    expansible: Boolean
  });

  const isExpand = ref(false);
</script>

<style lang="scss" scoped>
  .list-items {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 16px;
    border-bottom: 1px solid var(--color-medium);

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__description {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &__image {
      height: 3rem;
      width: 3rem;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    &__text {
      cursor: pointer;

      &--item {
        &:hover {
          color: var(--color-border-primary);
        }
      }

      &--subItem {
        &:hover {
          font-weight: bold;
        }
      }
    }

    &__subItem {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 0px 56px;

      &--animation {
        &-enter-active {
          animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        &-leave-active {
          animation: slide-out-top 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
        }
      }
    }
  }

  @keyframes slide-out-top {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-20px);
      opacity: 0;
    }
  }

  @keyframes slide-in-top {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
