<template>
  <div :class="baseClass">
    <base-text-input
      @input="setQuery"
      @onEnterPress="setKeywords"
      :value="value"
      :form="form"
      :label="label"
      :placeholder="placeholder"
      :error="repeatError"
      :icon="icon"
      :color="color"
      :type="type"
      :disabled="disabled"
      :help="error || repeatError ? undefined : t('keyword.help')"
    />
    <div :class="`${baseClass}__keywords`">
      <base-pill
        v-for="keyword in keywords"
        :key="keyword"
        @remove="query => $emit('remove', query)"
        :text="keyword"
        text-size="small"
        color="primary"
        is-removable
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PropType, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { ColorType, InputFormType, InputType } from '../../types';

  import BasePill from '../base-pill.component.vue';

  import BaseTextInput from './base-text-input.component.vue';

  const baseClass = 'base-keywords';

  const { t } = useI18n();

  const props = defineProps({
    form: {
      type: String as PropType<InputFormType>,
      default: 'round'
    },
    values: {
      type: Array as PropType<Array<string>>,
      default: () => []
    },
    label: String,
    help: String,
    placeholder: String,
    error: String,
    icon: String,
    color: {
      type: String as PropType<ColorType>,
      default: 'default'
    },
    type: {
      type: String as PropType<InputType>,
      default: 'solid'
    },
    disabled: Boolean
  });

  const emit = defineEmits(['add', 'remove']);

  const value = ref('');
  const keywords = ref(props.values);
  const repeatError = ref('');

  const existKeyword = (query: string) =>
    keywords.value.findIndex(keyword => keyword === query) !== -1;

  const setQuery = (query: string) => {
    value.value = query;
    repeatError.value = !existKeyword(query) ? '' : t('keyword.error');
  };

  const setKeywords = async (query: string) => {
    if (!existKeyword(query)) {
      emit('add', query);
      value.value = '';
    }
  };

  watch(
    () => props.values,
    () => {
      keywords.value = props.values;
    }
  );
</script>

<style lang="scss" scoped>
  .base-keywords {
    &__keywords {
      display: flex;
    }
  }
</style>
