import { fetchData } from "./httpClient";

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const ANALYTICS_PATH = `${BASE_PATH}/analytics`;

export const analyticsService = {
    getTopProductsAnalytics: async (categories?: string[]) => {
        const url = new URL(`${ANALYTICS_PATH}/topProducts`);

        if (categories?.length) {
            categories.forEach(category => url.searchParams.append('categories', category));
        }
        
        const data = fetchData(url.toString(), { method: 'GET' });
        return data;
    },
    getTopPurchasedProductsAnalytics: async (categories?: string[]) => {
        const url = new URL(`${ANALYTICS_PATH}/topPurchased`);

        if (categories?.length) {
            categories.forEach(category => url.searchParams.append('categories', category));
        }
        
        const data = fetchData(url.toString(), { method: 'GET' });
        return data;
    },
    getMostViewedCategories: async () => {
        const url = new URL(`${ANALYTICS_PATH}/topCategories`);
        
        const data = fetchData(url.toString(), { method: 'GET' });
        return data;
    },
    getMostPurchasedCategories: async () => {
        const url = new URL(`${ANALYTICS_PATH}/topPurchasedCategories`);
        
        const data = fetchData(url.toString(), { method: 'GET' });
        return data;
    },
    
}