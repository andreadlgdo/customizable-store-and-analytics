import { fetchData } from './httpClient';

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const CUSTOM_PATH = `${BASE_PATH}/custom`;

export interface CustomResponse {
    _id: string;
    page: string;
    texts?: object;
    data?:  object;
    visuals?:  object;
}

interface UpdateCustomPayload {
    texts?: object;
    data?: object;
    visuals?: object;
}

const buildUrl = (page?: string): string => {
    const url = new URL(CUSTOM_PATH);
    if (page) {
        url.searchParams.append('page', page);
    }
    return url.toString();
};

const fetchCustomTexts = async (page?: string): Promise<CustomResponse> => {
    const data = await fetchData(buildUrl(page), {
        method: 'GET'
    });
    return data[0];
};

export const customService = {
    getCustom: async (page?: string): Promise<CustomResponse> => {
        return fetchCustomTexts(page);
    },

    getCustomTexts: async (page?: string): Promise<object> => {
        const response = await fetchCustomTexts(page);
        return response.texts || {};
    },

    getCustomVisuals: async (page?: string): Promise<Record<string, any>> => {
        const response = await fetchCustomTexts(page);
        return response.visuals || {};
    },

    getCustomData: async (page?: string): Promise<Record<string, any>> => {
        const response = await fetchCustomTexts(page);
        return response.data || {};
    },

    updateCustom: async (page: string, payload: UpdateCustomPayload = {}): Promise<CustomResponse> => {
        const body: UpdateCustomPayload = {};
        if (payload.texts !== undefined) body.texts = payload.texts;
        if (payload.data !== undefined) body.data = payload.data;
        if (payload.visuals !== undefined) body.visuals = payload.visuals;

        return await fetchData(`${CUSTOM_PATH}/${page}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }
}; 