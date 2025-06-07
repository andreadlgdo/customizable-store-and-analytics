import { analyticsService } from "@/services";

export function useAnalytics() {

    const getTopProducts = async () => await analyticsService.getTopProductsAnalytics()

    return {
        getTopProducts
    }
}