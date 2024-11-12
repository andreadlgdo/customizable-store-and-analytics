<template>
  <section :class="baseClass">
    <div v-for="item in items" :key="item._id" :class="`${baseClass}__category`">
      <div
        :class="`${baseClass}__image`"
        :style="{ backgroundImage: `url(${item.imageUrl})` }"
      ></div>
      <base-text tag="h4" :class="`${baseClass}__text`">
        {{ capitalizeSentence(item.title) }}
      </base-text>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import { useTextTransform } from '../../composables';
  import { Category } from '../../interfaces';
  import { SizeType } from '../../types';

  import BaseText from '../base-text.component.vue';

  defineProps({
    items: {
      type: Array as PropType<Category[]>,
      default: () => []
    },
    size: {
      type: String as PropType<SizeType>,
      default: 'normal'
    }
  });

  const baseClass = 'categories-carousel';

  const { capitalizeSentence } = useTextTransform();
</script>

<style lang="scss" scoped>
  .categories-carousel {
    display: flex;
    align-items: center;
    gap: 4rem;
    height: 20rem;
    padding: 0 4rem;
    background-color: var(--color-primary);
    overflow-x: scroll;

    &__category {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }

    &__image {
      height: 180px;
      width: 180px;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      cursor: pointer;
    }

    &__text {
      cursor: pointer;
    }
  }
</style>
