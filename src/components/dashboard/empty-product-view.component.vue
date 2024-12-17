<template>
  <base-wrapper :class="baseClass">
    <base-text tag="h1">{{ selectedItem.label + ' ' + t('dashboard.emptyView.title') }}</base-text>
    <div :class="`${baseClass}__wrapper`">
      <svg-icon
        :src="
          require(
            `../../assets/media/icons/${selectedItem.id === 1 ? 'cart_empty' : 'heart_empty'}.svg`
          )
        "
        size="extra-large"
      />
      <svg-icon
        :class="[
          `${baseClass}__icon`,
          selectedItem.id === 1 ? `${baseClass}__icon--cart` : `${baseClass}__icon--whistList`
        ]"
        :src="require('../../assets/media/icons/cero.svg')"
        size="small"
      />
    </div>
    <base-button
      @click="router.push('/products')"
      :text="t('dashboard.emptyView.action')"
      color="primary"
      type="outline-solid"
      have-shadow
    />
  </base-wrapper>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  import { MenuItem } from '../../interfaces';

  import BaseText from '../base-text.component.vue';
  import { SvgIcon } from '../icons';
  import { BaseButton } from '../inputs';

  import BaseWrapper from './base-wrapper.component.vue';

  const baseClass = 'empty-cart';

  const { t } = useI18n();
  const router = useRouter();

  defineProps({
    selectedItem: {
      type: Object as PropType<MenuItem>,
      required: true
    }
  });
</script>

<style lang="scss" scoped>
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4rem;

    &__wrapper {
      position: relative;
    }

    &__icon {
      position: absolute;

      &--cart {
        top: 4px;
        left: 35px;
      }

      &--whistList {
        bottom: 14px;
        right: 6px;
      }
    }
  }
</style>
