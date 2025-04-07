import { fetchData } from './httpClient';
import { Category } from '../interfaces';

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const CATEGORY_PATH = `${BASE_PATH}/category`;

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    return fetchData(CATEGORY_PATH, { method: 'GET' });
  }
};
