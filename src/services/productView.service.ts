import { ProductView } from "@/interfaces/productView";
import { fetchData } from "./httpClient";

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const PRODUCT_VIEWS_PATH = `${BASE_PATH}/productViews`;

export const productViewService = {
    getProductViewsByUserId: async (userId: string) => {
        const url = new URL(`${PRODUCT_VIEWS_PATH}/${userId}`);
        return fetchData(url.toString(), { method: 'GET' });
    },

    createProductView: async (productView: ProductView) => {
        return fetchData(PRODUCT_VIEWS_PATH, { method: 'POST', body: JSON.stringify(productView) });
    }

};