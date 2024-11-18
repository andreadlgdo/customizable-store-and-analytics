<template>
  <section :class="baseClass" v-if="items">
    <div :class="`${baseClass}__properties`">
      <section
        v-for="(item, index) in items"
        :key="index"
        :class="`${baseClass}__property ${baseClass}__property--${index}`"
      >
        <svg-icon
          :src="require(`../assets/media/icons/properties/${item.icon}.svg`)"
          size="none"
          :class="`${baseClass}__svg`"
        />
        <base-text tag="h4">{{ item.label }}</base-text>
      </section>
    </div>
    <div
      v-if="!isMobileAndTable"
      :class="`${baseClass}__image`"
      :style="{ backgroundImage: `url(${backgroundImageUrl})` }"
    ></div>
  </section>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';

  import { useMobile } from '../composables';

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

  const { isMobileAndTable } = useMobile();
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

  @media only screen and (max-width: 1211px) {
    .properties-section {
      height: 48rem;

      &__properties {
        flex-wrap: wrap;
        gap: 3.5rem;
        padding: 1rem;
      }

      &__property {
        margin: 0;

        &--0,
        &--1,
        &--2 {
          margin-top: 1rem;
        }
      }

      &__image {
        height: 48rem;
      }

      &__svg {
        width: 6.5rem;
        height: 6.5rem;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .properties-section {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40rem;
    }
  }

  @media only screen and (max-width: 500px) {
    .properties-section {
      height: 68rem;
    }
  }
</style>
