<template>
  <base-aside @close="$emit('close')" :is-open="isOpen" type="round">
    <div :class="baseClass">
      <base-toggle @selectToggle="selectToggle" :item="toggleItem" color="primary" have-shadow />
      <transition-group :name="baseClass" mode="out-in">
        <base-text tag="h3">{{ 'Tu ' + toggleSelectedValue + ' esta vacia' }}</base-text>

        <svg-icon
          v-if="toggleSelectedValue === toggleValues[0]"
          :class="`${baseClass}__icon ${baseClass}__icon--cart`"
          :src="require('../../assets/media/icons/cart_empty.svg')"
          color-attribute="stroke"
          size="extra-large"
        />
        <svg-icon
          v-else
          :class="`${baseClass}__icon ${baseClass}__icon--whistlist`"
          :src="require('../../assets/media/icons/heart_empty.svg')"
          color-attribute="both"
          size="extra-large"
        />
        <svg-icon
          :class="[
            `${baseClass}__icon`,
            toggleSelectedValue === toggleValues[0]
              ? `${baseClass}__icon--cero-cart`
              : `${baseClass}__icon--cero-whistlist`
          ]"
          :src="require('../../assets/media/icons/cero.svg')"
          size="small"
        />
        <categories-section
          v-for="category in categories"
          :key="category._id"
          :category="category.title"
          :image="category.imageUrl"
          have-shadow
        />
      </transition-group>
      <base-button
        @click="$emit('close')"
        type="outline-solid"
        color="primary"
        text="Seguir comprando"
        size="large"
      />
    </div>
  </base-aside>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';

  import { CategoryEnum } from '../../enums';
  import { Category } from '../../interfaces';
  import { categoryService } from '../../services';

  import BaseToggle from '../inputs/base-toggle.component.vue';

  import CategoriesSection from '../categories-section.component.vue';

  import BaseAside from './base-aside.component.vue';
  import BaseButton from '../inputs/base-button.component.vue';
  import BaseText from '../base-text.component.vue';
  import SvgIcon from '../icons/svg-icon.component.vue';

  const baseClass = 'shop-aside';

  const toggleValues = ['Carrito', 'Whistlist'];

  defineProps({
    isOpen: Boolean
  });

  defineEmits(['close']);

  const categories = ref<Category[]>([]);

  const toggleItem = ref({
    first: { value: toggleValues[0], selected: true },
    second: { value: toggleValues[1], selected: false }
  });

  const toggleSelectedValue = computed(
    () => Object.values(toggleItem.value).find(item => item.selected)?.value
  );

  const selectToggle = (value: string) => {
    if (toggleValues[0] === value) {
      toggleItem.value.first.selected = true;
      toggleItem.value.second.selected = false;
    } else {
      toggleItem.value.first.selected = false;
      toggleItem.value.second.selected = true;
      console.log('toggleSelectedValue', toggleSelectedValue.value);
    }
  };

  onMounted(async () => {
    const categoriesImages = await categoryService.getCategoriesImages();
    categoriesImages.forEach((category: Category) => {
      if (category.title === CategoryEnum.BOLSOS || category.title === CategoryEnum.ZAPATOS) {
        categories.value.push(category);
      }
    });
  });
</script>

<style lang="scss" scoped>
  .shop-aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 5rem 2rem 3rem 2rem;
    height: 100vh;

    &-enter-active {
      animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    }

    &-move {
      transition: transform 0.8s ease;
    }

    &__icon {
      &--cart {
        position: relative;
      }
      &--cero-cart {
        position: absolute;
        top: 236px;
        right: 181px;
      }

      &--cero-whistlist {
        position: absolute;
        top: 270px;
        right: 170px;
      }
    }
  }
</style>
