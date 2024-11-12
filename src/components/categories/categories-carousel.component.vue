<template>
  <section :class="baseClass">
    <div v-for="category in categories" :key="category._id" :class="`${baseClass}__category`">
      <div
        :class="`${baseClass}__image`"
        :style="{ backgroundImage: `url(${category.imageUrl})` }"
      ></div>
      <base-text tag="h4" :class="`${baseClass}__text`">
        {{ capitalizeSentence(category.title) }}
      </base-text>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, PropType } from 'vue';

  import { useCategories, useTextTransform } from '../../composables';
  import { SizeType } from '../../types';

  import BaseText from '../base-text.component.vue';

  defineProps({
    size: {
      type: String as PropType<SizeType>,
      default: 'normal'
    }
  });
  const baseClass = 'categories-carousel';

  const { categories, loadCategories } = useCategories();

  const { capitalizeSentence } = useTextTransform();

  onMounted(() => {
    loadCategories();
  });
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
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-radius: 50%;
      cursor: pointer;
    }

    &__text {
      cursor: pointer;
    }
  }
</style>
