<template>
  <div :class="baseClass">
    <UiTextbox
      @input="setPassword"
      :value="value"
      :label="label"
      placeholder="**********"
      :disabled="disabled"
      :error="error"
      type="password"
    />
    <div v-if="haveConditions" :class="`${baseClass}__conditions`">
      <UiPill
        v-for="(condition, index) in conditions"
        :key="index"
        :text="condition.label"
        :status="condition.status"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import UiTextbox from '@/components/shared/ui-textbox.component.vue';
  import UiPill from '@/components/shared/ui-pill.component.vue';

  const baseClass = 'ui-password';

  const props = defineProps({
    value: {
      type: String,
      required: true
    },
    label: String,
    placeholder: String,
    disabled: Boolean,
    error: String,
    haveConditions: Boolean
  });

  const emit = defineEmits(['input']);

  const conditions = ref([
    {
      label: 'Al menos 8 caracteres',
      status: 'error',
      validate: (query: string) => query.length >= 8
    },
    {
      label: 'Al menos 1 letra',
      status: 'error',
      validate: (query: string) => /[a-zA-Z]/.test(query)
    },
    { label: 'Al menos 1 número', status: 'error', validate: (query: string) => /\d/.test(query) },
    {
      label: 'Al menos 1 caracter especial',
      status: 'error',
      validate: (query: string) => /[^a-zA-Z0-9]/.test(query)
    }
  ]);

  const setPassword = (query: string) => {
    if (props.haveConditions) {
      conditions.value = conditions.value.map(condition => ({
        ...condition,
        status: condition.validate(query) ? 'success' : 'error'
      }));
      emit(
        'input',
        query,
        conditions.value.every(condition => condition.status === 'success')
      );
    } else {
      emit('input', query);
    }
  };
</script>

<style lang="scss" scoped>
  .ui-password {
    width: 100%;

    &__conditions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding-top: 8px;
    }
  }
</style>
