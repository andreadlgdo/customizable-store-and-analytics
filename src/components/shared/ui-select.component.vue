<template>
  <div :class="[baseClass, { [`${baseClass}--disabled`]: disabled }]" ref="dropdownRef">
    <p v-if="label">{{ label }}</p>

    <div :class="`${baseClass}__selected`" @click="isOpen = !isOpen">
      {{ capitalizeSentence(selectedOption ?? placeholder) }}
    </div>

    <ul v-if="isOpen" :class="`${baseClass}__dropdown`">
      <li
        v-for="(option, index) in options"
        :key="index"
        :class="[
          `${baseClass}__option`,
          { [`${baseClass}__option--selected`]: option.title === selectedOption }
        ]"
        @click.stop="selectOption(option.title)"
      >
        {{ capitalizeSentence(option.title) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, PropType, onMounted, onBeforeUnmount } from 'vue';
  import { useTextTransform } from '../../composables';

  const baseClass = 'ui-select';

  const { capitalizeSentence } = useTextTransform();

  const props = defineProps({
    value: {
      type: String,
      required: true
    },
    options: {
      type: Array as PropType<{ title: string }[]>,
      default: () => []
    },
    label: String,
    placeholder: String,
    disabled: Boolean
  });

  const emit = defineEmits(['change']);

  const isOpen = ref(false);
  const dropdownRef = ref<HTMLElement | null>(null);

  const selectedOption = computed(
    () => props.options.find(opt => opt.title === props.value)?.title
  );

  const selectOption = (title: string) => {
    emit('change', title);
    isOpen.value = false;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      isOpen.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<style lang="scss" scoped>
  .ui-select {
    position: relative;
    width: 100%;
    cursor: pointer;
    overflow: visible !important;

    &__selected {
      padding: 10px 16px;
      border-radius: 10px;
      border: 1px solid var(--color-dark-primary);
      background: var(--bg-transparent);
    }

    &__dropdown {
      position: absolute;
      z-index: 1;
      border: 1px solid var(--color-dark-primary);
      border-radius: 10px;
      list-style: none;
      padding: 0;
      width: 100%;
      max-height: 12.5rem;
      background: var(--color-soft-primary);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow-y: scroll;
    }

    &__option {
      padding: 10px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover,
      &--selected {
        background: var(--color-primary);
      }
    }

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
</style>
