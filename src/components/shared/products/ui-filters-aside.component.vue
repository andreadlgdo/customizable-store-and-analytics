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
            <div :class="`${baseClass}__body`">
              <div :class="`${baseClass}__content`">
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
              <div :class="`${baseClass}__footer`">
                <UiButton @click="cleanFilters" text="Limpiar filtros" transparent :class="`${baseClass}__button`"/>
                <UiButton @click="$emit('close')" text="Aplicar filtros" :class="`${baseClass}__button`"/>
              </div>
            </div>
        </div>
    </UiAside>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';

import { useCategories } from '../../../composables';

import UiAside from '../ui-aside.component.vue';
import UiButton from '../ui-button.component.vue';
import UiSelect from '../ui-select.component.vue';

const props = defineProps({
    isOpen: Boolean,
    categoryFilter: {
        type: String,
        default: undefined
    }
});

const emit = defineEmits(['close', 'selectCategory', 'cleanFilters']);

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

const cleanFilters = () => {
    parentCategory.value = '';
    childrenCategory.value = '';
    emit('cleanFilters');
};

onMounted(async () => {
    await loadCategories();
});
</script>

<style lang="scss" scoped>
.ui-filters-aside {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 2rem;

    &__title {
        font-size: 2rem;
        font-weight: bolder;
    }

    &__body {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        min-height: 0;
        margin-top: 1rem;
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex: 1 1 auto;
        overflow-y: auto;
        min-height: 0;
        margin-bottom: 1rem;
    }

    &__footer {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        background: white;
        padding-top: 1rem;
    }

    &__button {
      width: 100%;
      height: 3rem;
    }
}
</style>