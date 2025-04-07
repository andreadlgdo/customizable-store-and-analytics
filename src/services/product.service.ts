import { fetchData } from './httpClient';
import { Product } from '../interfaces';

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const PRODUCTS_PATH = `${BASE_PATH}/products`;

export const productService = {
  getProducts: async (categories?: string[]): Promise<Product[]> => {
    const url = new URL(PRODUCTS_PATH);

    if (categories?.length) {
      categories.forEach(category => url.searchParams.append('categories', category));
    }

    return fetchData(url.toString(), { method: 'GET' });
  },
  
  createProduct: async (productData: Product): Promise<Product> => {
    return fetchData(PRODUCTS_PATH, {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },
  
  findProductByIds: async (ids: string[]): Promise<Product[]> => {
    if (ids.length) {
      const url = new URL(`${PRODUCTS_PATH}/${ids.join(',')}`);
      return fetchData(url.toString(), { method: 'GET' });
    } else {
      return [];
    }
  },
  
  findProductByUserId: async (userId: string): Promise<Product[]> => {
    const url = new URL(`${PRODUCTS_PATH}/user/${userId}`);
    return fetchData(url.toString(), { method: 'GET' });
  },
  
  updateProduct: async (productData: Product): Promise<Product> => {
    if (!productData._id) {
      throw new Error('Product ID is required');
    }
    
    const response = await fetchData(`${PRODUCTS_PATH}/${productData._id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
    
    return response.product;
  },
  
  deleteProduct: async (id: string): Promise<void> => {
    if (!id) {
      throw new Error('Product ID is required');
    }

    return fetchData(`${PRODUCTS_PATH}/${id}`, { method: 'DELETE' });
  }
};
