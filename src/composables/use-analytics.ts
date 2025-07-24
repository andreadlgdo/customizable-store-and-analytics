import { analyticsService } from "@/services";

export function useAnalytics() {

    const getTopProducts = async (categories?: string[]) => await analyticsService.getTopProductsAnalytics(categories)

    const getTopPurchasedProducts = async (categories?: string[]) => await analyticsService.getTopPurchasedProductsAnalytics(categories)

    const getMostViewedCategories = async () => await analyticsService.getMostViewedCategories()

    const getMostPurchasedCategories = async () => await analyticsService.getMostPurchasedCategories()

    return {
        getTopProducts,
        getTopPurchasedProducts,
        getMostViewedCategories,
        getMostPurchasedCategories
    }
}