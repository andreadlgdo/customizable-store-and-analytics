import { fetchData } from "./httpClient";

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const ANALYTICS_PATH = `${BASE_PATH}/analytics`;

export const analyticsService = {
    getTopProductsAnalytics: async () => {
        const url = new URL(`${ANALYTICS_PATH}/topProducts`);
        const data = fetchData(url.toString(), { method: 'GET' });
        return data;
    }
}