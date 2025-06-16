<template>
  <div
    :class="[
      baseClass,
      { [`${baseClass}--disabled`]: disabled },
      { [`${baseClass}--error`]: !!error }
    ]"
  >
    <p v-if="label">{{ capitalizeSentence(label) }}</p>
    <input v-if="!multiline" :type="type" v-model="query" :placeholder="placeholder" :class="`${baseClass}__input`" :aria-label="label ?? 'textbox'" />
    <textarea v-else v-model="query" :placeholder="placeholder" :class="`${baseClass}__input ${baseClass}__textarea`" :aria-label="label ?? 'textbox'"></textarea>
    <p v-if="error" :class="`${baseClass}__text ${baseClass}__text--error`">{{ error }}</p>
    <p v-if="info" :class="`${baseClass}__text ${baseClass}__text--info`" >
      <ui-icon :src="require(`@/assets/media/icons/info.svg`)" size="small"></ui-icon>{{ info }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';

  import { useTextTransform } from '@/composables';
  import UiIcon from '@/components/shared/ui-icon.component.vue';
  const baseClass = 'ui-textbox';

  const { capitalizeSentence } = useTextTransform();

  const props = defineProps({
    value: {
      type: String, Number,
      required: true
    },
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    multiline: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    error: String,
    info: String
  });

  const emit = defineEmits(['input']);

  const query = ref(props.value);

  watch(
    () => query.value,
    () => {
      emit('input', query.value);
    }
  );

  watch(
    () => props.value,
    newValue => {
      query.value = newValue;
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .ui-textbox {
    $baseClass: &;

    width: 100%;

    &__input {
      outline: none;
      padding: 10px 16px;
      width: 100%;
      max-height: 42px;
      border-radius: 10px;
      border: 1px solid var(--color-dark-primary);
      background: var(--bg-transparent);

      &:focus {
        border: 2px solid var(--color-dark-primary);
      }
    }

    &__textarea {
      min-height: 100px;
      resize: vertical;
      overflow-y: auto;
      max-height: 300px;
      line-height: 1.5;
    }

    &--error {
      #{$baseClass}__input {
        border: 1px solid var(--color-red);
        &:focus {
          border: 2px solid var(--color-red);
        }
      }
    }

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &__text {
      font-size: 12px;

      &--error {
        color: var(--color-red);
      }
      &--info {
        display: flex;
        align-items: center;
        gap: 2px;
        margin-top: 2px;
      }
    }
  }
</style>
