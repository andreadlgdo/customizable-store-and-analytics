<template>
  <div :class="baseClass">
    <ui-textbox
      @input="query => $emit('input', query)"
      :value="value"
      :label="label"
      placeholder="**********"
      :disabled="disabled"
      :error="error"
      type="password"
    />
  </div>
</template>

<script lang="ts" setup>
  import UiTextbox from './ui-textbox.component.vue';

  const baseClass = 'ui-password';

  defineProps({
    value: {
      type: String,
      required: true
    },
    label: String,
    placeholder: String,
    disabled: Boolean,
    error: String
  });

  defineEmits(['input']);
</script>

<style lang="scss" scoped></style>
