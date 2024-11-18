<template>
  <section :class="baseClass" v-if="items">
    <div :class="`${baseClass}__properties`">
      <section
        v-for="(item, index) in items"
        :key="index"
        :class="`${baseClass}__property ${baseClass}__property--${index}`"
      >
        <svg-icon :src="require(`../assets/media/icons/properties/${item.icon}.svg`)" size="none" />
        <base-text tag="h4">{{ item.label }}</base-text>
      </section>
    </div>
    <div
      :class="`${baseClass}__image`"
      :style="{ backgroundImage: `url(${backgroundImageUrl})` }"
    ></div>
  </section>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import BaseText from './base-text.component.vue';
  import { SvgIcon } from './icons';

  const baseClass = 'properties-section';

  interface PropertyItem {
    label: string;
    icon: string;
  }

  defineProps({
    items: {
      type: Array as PropType<PropertyItem[]>,
      required: true
    },
    backgroundImageUrl: {
      type: String,
      required: true
    }
  });
</script>

<style lang="scss" scoped>
  .properties-section {
    width: 100%;
    height: 44rem;
    background-color: var(--color-primary);

    &__properties {
      position: absolute;
      display: flex;
      justify-content: space-evenly;
      width: 100%;
      gap: 6rem;
      padding: 0 2rem;
      overflow-x: hidden;
    }

    &__properties {
      position: absolute;
      display: flex;
      justify-content: space-evenly;
      width: 100%;
      gap: 6rem;
      padding: 0 2rem;
      overflow-x: hidden;
    }

    &__property {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1rem;

      &--0,
      &--4 {
        margin-top: 3rem;
      }

      &--1,
      &--3 {
        margin-top: 6rem;
      }

      &--2 {
        margin-top: 9rem;
      }
    }

    &__image {
      height: 44rem;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      clip-path: polygon(0 50%, 50% 60%, 100% 50%, 100% 100%, 0% 100%);
    }
  }
</style>
