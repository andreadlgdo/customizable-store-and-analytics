import { computed, ref } from 'vue';

import { Category } from '../interfaces';
import { categoryService } from '../services';

export function useCategories() {
  const categories = ref<Category[]>();

  const parentCategories = computed(() =>
    categories.value?.filter((category: Category) => !category.parentId)
  );

  const getOneCategory = (filterCategories: string): Category | undefined => {
    return categories.value?.find(category => filterCategories === category.title);
  };

  const getCategoriesByFilter = (filterCategories: string[]): Category[] => {
    return categories.value?.filter(category => filterCategories.includes(category.title)) ?? [];
  };

  const childrenCategories = (parentCategory: string) => {
    const parentCategoryId = parentCategories.value?.find(p => p.title === parentCategory);
    return categories.value?.filter(
      (category: Category) => category.parentId === parentCategoryId?._id
    );
  };

  const loadCategories = async () => {
    categories.value = await categoryService.getCategories();
  };

  return {
    categories,
    parentCategories,
    loadCategories,
    getOneCategory,
    getCategoriesByFilter,
    childrenCategories
  };
}
