import { fetchData } from './httpClient';

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const CUSTOM_TEXTS_PATH = `${BASE_PATH}/customTexts`;

export const customTextsService = {
    getCustomTexts: async (page?: string) => {
        const url = new URL(CUSTOM_TEXTS_PATH);
        if (page) {
            url.searchParams.append('page', page);
        }
        return await fetchData(url.toString(), {
            method: 'GET'
        });
    }
} 