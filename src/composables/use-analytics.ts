import { analyticsService } from "@/services";

export function useAnalytics() {

    const getTopProducts = async (categories?: string[]) => await analyticsService.getTopProductsAnalytics(categories)

    return {
        getTopProducts
    }
}