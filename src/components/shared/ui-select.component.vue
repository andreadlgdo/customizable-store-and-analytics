<template>
  <div :class="[baseClass, { [`${baseClass}--disabled`]: disabled }]" ref="dropdownRef">
    <p v-if="label">{{ label }}</p>

    <div :class="`${baseClass}__selected`" @click="isOpen = !isOpen">
      <span :class="{ [`${baseClass}__placeholder`]: !selectedOption || selectedOption === 'all by default' }">
        {{ capitalizeSentence(selectedOption === 'all by default' && !showAllOption ? placeholder : selectedOption ?? placeholder) }}
      </span>
      <UiIcon size="small"  :class="`${baseClass}__icon`" :src="require(`@/assets/media/icons/arrow.svg`)" />
    </div>

    <ul v-if="isOpen" :class="`${baseClass}__dropdown`">
      <li
        v-for="(option, index) in allOptions"
        :key="index"
        :class="[
          `${baseClass}__option`,
          { [`${baseClass}__option--selected`]: option.title === selectedOption },
          { [`${baseClass}__option--disabled`]: option.disabled }
        ]"
        @click.stop="selectOption(option.value ?? option.title)"
      >
        {{ capitalizeSentence(option.title) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, PropType, onMounted, onBeforeUnmount } from 'vue';
  import { useTextTransform } from '@/composables';

  import UiIcon from '@/components/shared/ui-icon.component.vue';

  const baseClass = 'ui-select';

  const { capitalizeSentence } = useTextTransform();

  const props = defineProps({
    value: {
      type: String,
      required: true
    },
    options: {
      type: Array as PropType<{ title: string; value?: string; disabled?: boolean }[]>,
      default: () => []
    },
    label: String,
    placeholder: {
      type: String,
      default: 'Select'
    },
    disabled: Boolean,
    showAllOption: Boolean
  });

  const emit = defineEmits(['change']);

  const isOpen = ref(false);
  const dropdownRef = ref<HTMLElement | null>(null);

  const allOptions = computed(() => !props.showAllOption ? props.options : [{ title: 'all by default' }, ...props.options]);

  const selectedOption = computed(
    () => {
      if (props.showAllOption && !props.value) {
        return 'all by default';
      }
      return allOptions.value.find(opt => opt.title === props.value || opt.value === props.value)?.title ?? 'all by default';
    }
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
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      max-height: 42px;
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

      &--disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }

    &__icon {
      transform: rotate(90deg);
    }

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &__placeholder {
      color: #999;
    }
  }
</style>
