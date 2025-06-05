<template>
    <UiAside 
        :is-open="isOpen" 
        @click="$emit('close')" 
        icon="close"
    >
        <div :class="baseClass">
            <h1 :class="`${baseClass}__title`">
                Filtros
            </h1>
            <UiSelect 
                v-if="!categoryFilter" 
                @change="selectCategory" 
                label="Categoría" 
                :options="parentCategories" 
                :value="parentCategory" 
                show-all-option
            />
            <UiSelect 
                v-if="isParentCategorySelected || parentCategory !== ''" 
                @change="selectSubcategory" 
                label="Subcategoría" 
                :options="childrenCategories" 
                :value="childrenCategory" 
                show-all-option
            />
        </div>
    </UiAside>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';

import { useCategories } from '../../../composables';

import UiAside from '../ui-aside.component.vue';
import UiSelect from '../ui-select.component.vue';

const props = defineProps({
    isOpen: Boolean,
    categoryFilter: {
        type: String,
        default: undefined
    }
});

const emit = defineEmits(['close', 'selectCategory']);

const baseClass = 'ui-filters-aside';

const { 
    parentCategories: parentCategoriesList, 
    loadCategories, 
    getChildrenByParent 
} = useCategories();

const parentCategory = ref<string>('');
const childrenCategory = ref<string>('');

const parentCategories = computed(() => {
    return parentCategoriesList.value?.map(category => ({
        title: category.title,
        disabled: false
    })) ?? [];
});

const childrenCategories = computed(() => {
    return getChildrenByParent(props.categoryFilter ?? parentCategory.value)?.map(subcategory => ({
        title: subcategory.title,
        disabled: false
    })) ?? [];
});

const isParentCategorySelected = computed(() => {
    return parentCategories.value.find(category => category.title === props.categoryFilter);
});

const selectCategory = async (value: string) => {
    parentCategory.value = value === 'all by default' ? '' : value;
    emit('selectCategory', parentCategory.value);
};

const selectSubcategory = async (value: string) => {
    childrenCategory.value = value === 'all by default' ? '' : value;
    emit('selectCategory', childrenCategory.value);
};

onMounted(async () => {
    await loadCategories();
});
</script>

<style lang="scss" scoped>
.ui-filters-aside {
    padding: 2rem;

    &__title {
        font-size: 2rem;
        font-weight: bolder;
    }
}
</style>