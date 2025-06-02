import { Category } from "../interfaces";
import { recommendationService } from "../services";

import { useCategories } from "./use-categories";

export const useRecommendations = () => {
    const { parentCategories, loadCategories, childrenCategories } = useCategories();

    const getTopCategories = async (userId: string): Promise<string[]> => {
        try {
            await loadCategories();
            
            const { topCategories } = await recommendationService.getTopCategoriesByUserId(userId);
            if (!topCategories?.length) return [];

            // Find parent categories from the top categories
            const matchingParentCategories = topCategories.filter((category: string) => 
                parentCategories.value?.some((parent: Category) => parent.title === category)
            );

            if (!matchingParentCategories.length) {
                return topCategories;
            }

            // Process each parent category and its children
            const results = await Promise.all(
                matchingParentCategories.map(async (parentCategory: string) => {
                    const children = await childrenCategories(parentCategory);
                    
                    if (!children?.length) {
                        return parentCategory;
                    }

                    const childrenTitles = children.map((child: Category) => child.title);
                    const matchingChildren = topCategories.filter((category: string) => 
                        childrenTitles.includes(category)
                    );

                    return matchingChildren.length ? matchingChildren : [parentCategory];
                })
            );

            // Flatten the results array and remove duplicates
            return Array.from(new Set(results.flat()));
        } catch (error) {
            console.error('Error fetching top categories:', error);
            return [];
        }
    };

    return {
        getTopCategories
    };
};