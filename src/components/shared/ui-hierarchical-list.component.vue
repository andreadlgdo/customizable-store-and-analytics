<template>
  <section v-for="item in listItems" :key="item.id" :class="baseClass">
    <div @click="expansible && clickable ? (item.isExpand = !item.isExpand) : undefined" :class="[`${baseClass}__item`, { [`${baseClass}__item--clickable`]: clickable }]">
      <section :class="`${baseClass}__label`">
        <div
          v-if="item.image"
          :class="`${baseClass}__image`"
          :style="{ backgroundImage: `url(${item.image})` }"
        ></div>
        <p @click="clickItem(item)" :class="`${baseClass}__text ${baseClass}__text--item`">
          {{ capitalizeSentence(item.label) }}
        </p>
      </section>
      <UiIconButton
        v-if="item.subItem"
        :icon="expansible ? (item.isExpand ? 'less' : 'plus') : 'arrow'"
        :size="expansible ? (item.isExpand ? 'small' : 'normal') : 'small'"
        @click="expansible && !clickable ? (item.isExpand = !item.isExpand) : $emit('clickSubItem', item)"
      />
    </div>
    <transition :name="`${baseClass}__subItem--animation`">
      <div v-if="item.subItem && expansible && item.isExpand" :class="`${baseClass}__subItem`">
        <div
          v-for="(subItem, index) in item.subItem"
          :key="index"
        >
          <p
            @click="$emit('clickItem', subItem)"
            :class="[`${baseClass}__text ${baseClass}__text--subItem`, { [`${baseClass}__text--clickable`]: clickable }]"
          >
            {{ capitalizeSentence(subItem.label) }}
          </p>
          <p v-if="subItem.description" :class="`${baseClass}__description`">
            {{ subItem.description }}
          </p>
        </div>
      </div>
    </transition>
  </section>
</template>

<script lang="ts" setup>
  import { PropType, ref, watch } from 'vue';

  import { useTextTransform } from '@/composables';

  import UiIconButton from '@/components/shared/ui-icon-button.component.vue';

  interface Item {
    id: number;
    label: string;
    description?: string;
    subItem?: Item[];
    image?: string;
    icon?: string;
    isExpand?: boolean;
  }

  const baseClass = 'list-items';

  const props = defineProps({
    items: {
      type: Array as PropType<Item[]>,
      required: true
    },
    expansible: Boolean,
    clickable: Boolean
  });

  const emit = defineEmits(['clickItem', 'clickSubItem']);

  const { capitalizeSentence } = useTextTransform();

  const listItems = ref(
    props.expansible ? props.items.map(item => ({ ...item, isExpand: false })) : props.items
  );

  const clickItem = (item: Item): void => {
    emit('clickItem', item);
  };

  watch(
    () => props.items,
    () =>
      (listItems.value = props.expansible
        ? props.items.map(item => ({ ...item, isExpand: false }))
        : props.items)
  );
</script>

<style lang="scss" scoped>
  .list-items {
    $baseClass: &;

    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 16px;
    border-bottom: 1px solid var(--color-medium);

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &--clickable {
        cursor: pointer;
      }
    }

    &__label {
      display: flex;
      align-items: center;
      gap: 14px;
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
        font-size: 1.5rem;
        font-weight: 700;

        &:hover {
          color: var(--color-vibrant-primary);
        }
      }

      &--subItem {
        font-size: 1.25rem;
        font-weight: 400;

        &:hover {
          font-weight: bold;
        }
      }

      &--clickable {
        margin-top: 1rem;
      }

      &--clickable:hover {
          font-weight: 400;
          cursor: default;
      }
    }

    &__subItem {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 0 61px;

      &--animation {
        &-enter-active {
          animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        &-leave-active {
          animation: slide-out-top 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
        }
      }
    }

    &__description {
      font-size: 1.1rem;
      color: var(--color-medium-dark, #666);
      margin-left: 2.5rem;
      margin-top: 0.1rem;
      margin-bottom: 0.2rem;
      line-height: 1.3;
      font-weight: 400;
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
