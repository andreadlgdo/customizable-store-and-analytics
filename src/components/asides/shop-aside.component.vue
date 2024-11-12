<template>
  <base-aside @close="$emit('close')" :is-open="isOpen" type="round">
    <div :class="baseClass">
      <base-toggle @selectToggle="selectToggle" :item="toggleItem" color="primary" have-shadow />
      <transition-group :name="baseClass" mode="out-in">
        <base-text tag="h3">
          {{
            t('asides.shop.empty.you') + toggleSelectedValue + t('asides.shop.empty.description')
          }}
        </base-text>
        <svg-icon
          :key="toggleSelectedValue"
          :class="`${baseClass}__icon ${baseClass}__icon--${toggleSelectedValue === toggleValues[0] ? 'cart' : 'whistlist'}`"
          :src="
            require(
              `../../assets/media/icons/${toggleSelectedValue === toggleValues[0] ? 'cart_empty' : 'heart_empty'}.svg`
            )
          "
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
        :text="t('asides.shop.buy')"
        size="large"
      />
    </div>
  </base-aside>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useCategories } from '../../composables';
  import { CategoryEnum } from '../../enums';
  import { Category } from '../../interfaces';

  import BaseText from '../base-text.component.vue';
  import { CategoriesSection } from '../categories';
  import { SvgIcon } from '../icons';
  import { BaseButton, BaseToggle } from '../inputs';

  import BaseAside from './base-aside.component.vue';

  const baseClass = 'shop-aside';

  defineProps({
    isOpen: Boolean
  });

  defineEmits(['close']);

  const { t } = useI18n();

  const { loadCategories, getCategoriesByFilter } = useCategories();

  const categories = ref<Category[]>([]);

  const toggleValues = computed(() => [
    t('asides.shop.toggle.cart'),
    t('asides.shop.toggle.whistList')
  ]);

  const toggleItem = computed(() => ({
    first: { value: toggleValues.value[0], selected: true },
    second: { value: toggleValues.value[1], selected: false }
  }));

  const toggleSelectedValue = computed(
    () => Object.values(toggleItem.value).find(item => item.selected)?.value
  );

  const selectToggle = (value: string) => {
    const isFirstValue = value === toggleValues.value[0];
    toggleItem.value = {
      first: { value: toggleValues.value[0], selected: isFirstValue },
      second: { value: toggleValues.value[1], selected: !isFirstValue }
    };
  };

  onMounted(async () => {
    await loadCategories();
    categories.value = getCategoriesByFilter([CategoryEnum.BAGS, CategoryEnum.SHOES]);
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
