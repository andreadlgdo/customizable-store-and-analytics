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
               <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--order`">
                    <div 
                      @click="selectOrder(order.value)" 
                      v-for="order in orderOptions" 
                      :key="order.value" 
                      :class="[`${baseClass}__option ${baseClass}__option--order`,{[`${baseClass}__option--selected`]: order.selected}]"
                    >
                        {{ order.label }}
                    </div>
                </div>
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
                <p>Precio</p>
                <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--price`">
                    <div 
                      @click="selectPriceRange(index)"
                      v-for="(price, index) in priceOptions" 
                      :key="index"
                      :class="[`${baseClass}__option ${baseClass}__option--price`,{[`${baseClass}__option--selected`]: price.selected}]"
                    >
                        {{ price.min + '€' }} - {{ price.max + '€' }}
                    </div>
                </div>
                <UiCheckbox
                  text="Productos con descuento"
                  :value="showDiscountedProducts"
                  @change="selectDiscountedProducts"
                />
                <UiCheckbox
                  text="Productos disponibles"
                  :value="showAvailableProducts"
                  @change="selectAvailableProducts"
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

import { useCategories, useProducts } from '../../../composables';

import UiAside from '../ui-aside.component.vue';
import UiButton from '../ui-button.component.vue';
import UiCheckbox from '../ui-checkbox.component.vue';
import UiSelect from '../ui-select.component.vue';

const props = defineProps({
    isOpen: Boolean,
    categoryFilter: {
        type: String,
        default: undefined
    }
});

const emit = defineEmits(['close', 'applyFilters', 'cleanFilters']);

const baseClass = 'ui-filters-aside';

const useFilterState = () => {
    const parentCategory = ref<string>('');
    const childrenCategory = ref<string>('');
    const showDiscountedProducts = ref<boolean>(false);
    const showAvailableProducts = ref<boolean>(false);
    const orderOptions = ref([
        { label: 'Orden descendente', value: 'desc', selected: false },
        { label: 'Orden ascendente', value: 'asc', selected: false }
    ]);
    const priceState = ref({
        min: 0,
        max: 0,
        selectedIndex: -1
    });

    return {
        parentCategory,
        childrenCategory,
        showDiscountedProducts,
        showAvailableProducts,
        orderOptions,
        priceState
    };
};

const { 
    parentCategories: parentCategoriesList, 
    loadCategories, 
    getChildrenByParent 
} = useCategories();

const { priceRange: priceRangeList, loadProducts } = useProducts();

const {
    parentCategory,
    childrenCategory,
    showDiscountedProducts,
    showAvailableProducts,
    orderOptions,
    priceState
} = useFilterState();

const priceOptions = computed(() => 
    priceRangeList.value.map((price, index) => ({
        min: price.min,
        max: price.max,
        selected: index === priceState.value.selectedIndex
    }))
);

const orderSelected = computed(() => orderOptions.value.find(order => order.selected)?.value ?? '');

const parentCategories = computed(() => {
    return parentCategoriesList.value?.map(category => ({
        title: category.title,
        disabled: false
    })) ?? [];
});

const childrenCategories = computed(() => {
    return getChildrenByParent(props.categoryFilter ? props.categoryFilter : parentCategory.value)?.map(subcategory => ({
        title: subcategory.title,
        disabled: false
    })) ?? [];
});

const isParentCategorySelected = computed(() => {
    return parentCategories.value.find(category => category.title === props.categoryFilter);
});

const selectedCategory = computed(() => {
    if (props.categoryFilter) {
        return props.categoryFilter;
    } else if (childrenCategory.value) {
        return childrenCategory.value;
    } else {
        return parentCategory.value;
    }
});

const selectOrder = (value: string) => {
    orderOptions.value.forEach(order => {
        order.selected = order.value === value ? !order.selected : false;
    });
    applyFilters();
};

const selectCategory = async (value: string) => {
    parentCategory.value = value === 'all by default' ? '' : value;
    applyFilters(parentCategory.value);
};

const selectSubcategory = async (value: string) => {
    childrenCategory.value = value === 'all by default' ? '' : value;
    applyFilters(childrenCategory.value);
};

const selectPriceRange = (index: number) => {
    const isAlreadySelected = priceState.value.selectedIndex === index;
    const selectedPrice = priceOptions.value[index];
    
    priceState.value = {
        min: isAlreadySelected ? 0 : selectedPrice.min,
        max: isAlreadySelected ? 0 : selectedPrice.max,
        selectedIndex: isAlreadySelected ? -1 : index
    };

    applyFilters();
};

const selectDiscountedProducts = () => {
    showDiscountedProducts.value = !showDiscountedProducts.value;
    applyFilters();
};

const selectAvailableProducts = () => {
    showAvailableProducts.value = !showAvailableProducts.value;
    applyFilters();
};

const applyFilters = (specificCategory?: string) => {
    emit('applyFilters', 
        specificCategory ?? selectedCategory.value, 
        orderSelected.value, 
        showDiscountedProducts.value, 
        showAvailableProducts.value, 
        priceState.value.min, 
        priceState.value.max
    );
};

const cleanFilters = () => {
    parentCategory.value = '';
    childrenCategory.value = '';
    showDiscountedProducts.value = false;
    showAvailableProducts.value = false;
    priceState.value = {
        min: 0,
        max: 0,
        selectedIndex: -1
    };
    orderOptions.value.forEach(order => {
        order.selected = false;
    });
    emit('cleanFilters');
};

onMounted(async () => {
    await loadCategories();
    await loadProducts();
});
</script>

<style lang="scss" scoped>
.ui-filters-aside {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 2rem;
    width: 350px;

    &__title {
        font-size: 2rem;
        font-weight: bolder;
    }

    &__wrapper {
        display: flex;
        align-items: center;

        &--order {
            flex-direction: column;
            gap: 1rem;
        }

        &--price {
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
    }

    &__option {
        text-align: center;
        background: #f5f5f5;
        transition: background 0.2s;
        cursor: pointer;

        &--order {
            padding: 0.5rem 1.5rem;
            border-radius: 50px;
            width: 100%;
        }

        &--price {
            padding: 0.5rem;
            border-radius: 4px;
            width: 45%;
        }

        &:hover {
            background: rgba(225, 224, 224, 0.843)
        }

        &--selected {
            background: var(--color-vibrant-primary) !important;
        }
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