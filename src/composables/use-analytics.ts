import { analyticsService } from "@/services";

export function useAnalytics() {

    const getTopProducts = async (categories?: string[]) => await analyticsService.getTopProductsAnalytics(categories)

    const getTopPurchasedProducts = async (categories?: string[]) => await analyticsService.getTopPurchasedProductsAnalytics(categories)

    return {
        getTopProducts,
        getTopPurchasedProducts
    }
}