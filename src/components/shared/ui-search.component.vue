<template>
    <div :class="baseClass">
        <UiIcon :src="require('../../assets/media/icons/search.svg')" size="small"  :class="`${baseClass}__icon ${baseClass}__icon--left`" />
        <input type="text" :placeholder="placeholder" v-model="query" :class="`${baseClass}__input`"/>
        <UiIconButton @click="query = ''" icon="close" size="small" :class="`${baseClass}__icon ${baseClass}__icon--right`" />
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

import UiIconButton from './ui-icon-button.component.vue';
import UiIcon from './ui-icon.component.vue';

const baseClass = 'ui-search';

const props = defineProps({
    value: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: 'Search'
    }
});

const emit = defineEmits<{
    (e: 'search', query: string): void;
}>();

const query = ref<string>(props.value);

watch(() => props.value, (newValue) => {
    query.value = newValue;
});

watch(query, (newQuery: string) => {
    emit('search', newQuery);
});
</script>

<style lang="scss" scoped>
.ui-search {
    position: relative;
    display: flex;
    align-items: center;

    &__icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;

        &--left {
            left: 12px;
        }

        &--right {
            right: 12px;
        }
    }

    &__input {
        outline: none;
        background: transparent;
        border: 1px solid var(--color-dark-primary);
        padding: 8px 42px;
        border-radius: 25px;
        height: 40px;
        width: 100%;
    }
}
</style>

