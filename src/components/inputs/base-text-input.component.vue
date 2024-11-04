<template>
  <div :class="[baseClass, `${baseClass}--${form}`]">
    <div :class="`${baseClass}__header`">
      <base-text v-if="label" tag="default" :class="`${baseClass}__text`">
        {{ label }}
      </base-text>
      <slot name="header" />
    </div>
    <input
      v-model="query"
      :type="tag"
      :class="[`${baseClass}__input`, { [`${baseClass}__input--icon`]: icon }]"
      :placeholder="placeholder"
      :style="{
        '--background-color': type !== 'outline' ? `var(--color-${inputColor})` : 'transparent',
        '--border-color': type !== 'solid' ? `3px var(--color-border-${inputColor}) solid` : 'none'
      }"
    />
    <svg-icon
      v-if="icon"
      :src="require(`../../assets/media/icons/${icon}.svg`)"
      :color-attribute="colorAttribute"
      :class="`${baseClass}__icon ${baseClass}__icon--info`"
      :error="!!error"
      size="small"
    />
    <icon-button
      @click="clearQuery"
      icon="close"
      color-attribute="fill"
      size="small"
      :error="!!error"
      :class="`${baseClass}__icon ${baseClass}__icon--close`"
    />
    <base-text
      v-if="help || error"
      tag="small"
      :class="`${baseClass}__text`"
      :color="!!error ? 'error' : 'default'"
    >
      {{ help ?? error }}
    </base-text>
    <slot name="footer" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType, ref, watch } from 'vue';

  import { InputType, ColorType, InputFormType, SvgIconType } from '../../types';

  import BaseText from '../base-text.component.vue';
  import { IconButton, SvgIcon } from '../icons';

  const baseClass = 'base-text-input';

  const props = defineProps({
    tag: {
      type: String as PropType<'text' | 'password'>,
      default: 'text'
    },
    form: {
      type: String as PropType<InputFormType>,
      default: 'round'
    },
    value: {
      type: String,
      default: ''
    },
    label: String,
    help: String,
    placeholder: String,
    error: String,
    icon: String,
    colorAttribute: {
      type: String as PropType<SvgIconType>,
      default: undefined
    },
    color: {
      type: String as PropType<ColorType>,
      default: 'default'
    },
    type: {
      type: String as PropType<InputType>,
      default: 'solid'
    }
  });

  const emit = defineEmits(['input']);

  const query = ref(props.value ?? '');

  const inputColor = computed(() => (props.error ? 'error' : props.color));

  const clearQuery = () => {
    query.value = '';
  };

  watch(
    () => query.value,
    () => {
      emit('input', query);
    }
  );
</script>

<style lang="scss" scoped>
  .base-text-input {
    $baseClass: &;

    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &__header {
      display: flex;
      justify-content: space-between;
      padding-right: 14px;
    }

    &--round {
      & #{$baseClass}__input {
        border-radius: 25px;
      }
    }

    &--semi-round {
      & #{$baseClass}__input {
        border-radius: 8px;
      }
    }

    &--square {
      & #{$baseClass}__input {
        border-radius: 0;
      }
    }

    &__text {
      padding-left: 14px;
    }

    &__input {
      height: 42px;
      padding: 0 48px 0 16px;
      background-color: var(--background-color);
      border: var(--border-color);
      outline: none;

      &--icon {
        padding-left: 40px;
      }
    }

    &__icon {
      position: absolute;

      &--info {
        left: 14px;
        top: 34px;
      }

      &--close {
        right: 14px;
        top: 32px;
      }
    }
  }
</style>
