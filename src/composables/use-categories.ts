import { ref } from 'vue';

import { Category } from '../interfaces';
import { categoryService } from '../services';

export function useCategories() {
  const categories = ref<Category[]>();

  const getOneCategory = (filterCategories: string): Category | undefined => {
    return categories.value?.find(category => filterCategories === category.title);
  };

  const getCategoriesByFilter = (filterCategories: string[]): Category[] => {
    return categories.value?.filter(category => filterCategories.includes(category.title)) ?? [];
  };

  const loadCategories = async () => {
    categories.value = await categoryService.getCategories();
  };

  return {
    loadCategories,
    getOneCategory,
    getCategoriesByFilter
  };
}
