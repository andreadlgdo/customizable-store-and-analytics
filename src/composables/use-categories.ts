import { computed, ref } from 'vue';

import { Category } from '../interfaces';
import { categoryService } from '../services';

export function useCategories() {
  const categories = ref<Category[]>();

  const parentCategories = computed(() =>
    categories.value?.filter((category: Category) => !category.parentId)
  );

  const childrenCategories = computed(() =>
    categories.value?.filter((category: Category) => category.parentId)
  );

  const getCategoriesByFilter = (filterCategories: string[]): Category[] => {
    return categories.value?.filter(category => filterCategories.includes(category.title)) ?? [];
  };

  const getOneCategory = (filterCategories: string): Category | undefined => {
    return categories.value?.find(category => filterCategories === category.title);
  };

  const getChildrenByParent = (parentCategory: string) => {
    const parentCategoryId = parentCategories.value?.find(p => p.title === parentCategory);
    return categories.value?.filter(
      (category: Category) => category.parentId === parentCategoryId?._id
    );
  };

  const getRelatedIdCategories = async (categories: string[]) => {
    const results = await Promise.all(
      categories.map(async (c: string) => {
        const category = await getOneCategory(c);
        if (!category?.relatedId) return [];
        
        const relatedCategories = await Promise.all(
          category.relatedId.map(async (id: string) => {
            const response = await categoryService.getCategoryById(id);
            return response.title;
          })
        );
        return relatedCategories;
      })
    );
    return results.flat();
  }

  const loadCategories = async () => {
    categories.value = await categoryService.getCategories();
  };

  return {
    categories,
    parentCategories,
    childrenCategories,
    loadCategories,
    getCategoriesByFilter,
    getChildrenByParent,
    getRelatedIdCategories
  };
}
