import { ref } from 'vue';

import { Category } from '../interfaces';
import { categoryService } from '../services';

export function useCategories() {
  const categories = ref<Category[]>();

  const getCategoriesByFilter = (filterCategories: string[]): Category[] => {
    return categories.value?.filter(category => filterCategories.includes(category.title)) ?? [];
  };

  const loadCategories = async () => {
    categories.value = await categoryService.getCategories();
  };

  return {
    loadCategories,
    getCategoriesByFilter
  };
}
