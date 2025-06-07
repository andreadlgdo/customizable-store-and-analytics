import { fetchData } from './httpClient';

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const RECOMMENDATION_PATH = `${BASE_PATH}/recommendations`;


export const recommendationService = {
    getTopCategoriesByUserId: async (userId: string) => {
        const url = new URL(`${RECOMMENDATION_PATH}/orders/${userId}`);
        const data = fetchData(url.toString(), { method: 'GET' });
        return data;
    },

    getFavouriteCategoriesByUserId: async (userId: string) => {
        const url = new URL(`${RECOMMENDATION_PATH}/favourites/${userId}`);
        const data = fetchData(url.toString(), { method: 'GET' });
        return data;
    },

    getRecommendedProductsByNavigation: async (userId: string) => {
        const url = new URL(`${RECOMMENDATION_PATH}/productViews/${userId}`);
        const data = fetchData(url.toString(), { method: 'GET' });
        return data;
    }
}