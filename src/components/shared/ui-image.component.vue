<template>
  <span :class="[baseClass, `${baseClass}--${type}`, `${baseClass}--${size}`]">
    <div
      :class="`${baseClass}__image`"
      :style="{
        backgroundImage: `url(${image ?? require('../../assets/media/images/empty.png')})`
      }"
    />
    <IconButton
      v-if="uploadMode"
      @click="fileInput.click()"
      icon="download"
      tooltip-text="Upload new image"
      :class="`${baseClass}__icon`"
      size="small"
    />
    <input
      ref="fileInput"
      @change="$emit('upload', $event)"
      type="file"
      accept="image/*"
      style="display: none"
    />
  </span>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';

  import { InputFormType, SizeType } from '../../types';

  import IconButton from './ui-icon-button.component.vue';

  const baseClass = 'ui-image';

  defineProps({
    image: {
      type: String,
      default: undefined
    },
    type: {
      type: String as PropType<InputFormType>,
      default: 'round'
    },
    size: {
      type: String as PropType<SizeType>,
      default: 'normal'
    },
    alternativeText: String,
    uploadMode: Boolean
  });

  defineEmits(['upload']);

  const fileInput = ref();
</script>

<style lang="scss" scoped>
  .ui-image {
    $baseClass: &;

    position: relative;

    &__image {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    &--mini {
      #{$baseClass}__image {
        height: 5rem;
        width: 5rem;
      }
    }

    &--small {
      #{$baseClass}__image {
        height: 8rem;
        width: 8rem;
      }
    }

    &--normal {
      #{$baseClass}__image {
        height: 10rem;
        width: 10rem;
      }
    }

    &--extra-large {
      #{$baseClass}__image {
        height: 22rem;
        width: 18rem;
      }
    }

    &--large {
      #{$baseClass}__image {
        height: 16rem;
        width: 14rem;
      }
    }

    &--round {
      #{$baseClass}__image {
        border-radius: 50%;
      }
    }

    &--semi-round {
      #{$baseClass}__image {
        border-radius: 20%;
      }
    }

    &__icon {
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: var(--color-vibrant-primary);
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
    }
  }
</style>
