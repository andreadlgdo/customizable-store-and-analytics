import { fetchData } from './httpClient';

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const CUSTOM_TEXTS_PATH = `${BASE_PATH}/customTexts`;

export const customTextsService = {
    getCustomTexts: async (page?: string) => {
        return await fetchData(CUSTOM_TEXTS_PATH, {
            method: 'GET',
            params: {
                page: page ?? ''
            }
        });
    }
} 