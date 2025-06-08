import { Category } from "../interfaces";
import { recommendationService } from "../services";
import { useCategories } from "./use-categories";

type CategoryResponse = {
    topCategories: string[];
};

export const useRecommendations = () => {
    const { parentCategories, loadCategories, getChildrenByParent } = useCategories();

    const processCategories = async (categories: string[]): Promise<string[]> => {
        await loadCategories();
        if (!categories?.length) return [];

        // Find parent categories from the top categories
        const matchingParentCategories = categories.filter((category: string) => 
            parentCategories.value?.some((parent: Category) => parent.title === category)
        );

        if (!matchingParentCategories.length) {
            return categories;
        }

        // Process each parent category and its children
        const results = await Promise.all(
            matchingParentCategories.map(async (parentCategory: string) => {
                const children = await getChildrenByParent(parentCategory);
                
                if (!children?.length) {
                    return parentCategory;
                }

                const childrenTitles = children.map((child: Category) => child.title);
                const matchingChildren = categories.filter((category: string) => 
                    childrenTitles.includes(category)
                );

                return matchingChildren.length ? matchingChildren : [parentCategory];
            })
        );

        // Flatten the results array and remove duplicates
        return Array.from(new Set(results.flat()));
    };

    const fetchCategories = async (
        userId: string,
        fetchFn: (userId: string) => Promise<CategoryResponse>
    ): Promise<string[]> => {
        try {
            const { topCategories } = await fetchFn(userId);
            return await processCategories(topCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    };

    const getTopOrdersCategories = (userId: string): Promise<string[]> => {
        return fetchCategories(userId, recommendationService.getTopCategoriesByUserId);
    };

    const getTopFavouritesCategories = (userId: string): Promise<string[]> => {
        return fetchCategories(userId, recommendationService.getFavouriteCategoriesByUserId);
    };

    const getRecommendedProductsByNavigation = (userId: string): Promise<string[]> => {
        return fetchCategories(userId, recommendationService.getRecommendedProductsByNavigation);
    };

    return {
        processCategories,
        getTopOrdersCategories,
        getTopFavouritesCategories,
        getRecommendedProductsByNavigation
    };
};