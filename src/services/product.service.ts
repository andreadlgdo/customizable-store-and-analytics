import { fetchData } from '../services/httpClient';
import { Product } from '../interfaces';

const apiUrl = process.env.VUE_APP_API_URL;

export const productService = {
  getProducts: async function (categories?: string[]) {
    const url = new URL(`${apiUrl}/api/products`);

    if (categories?.length) {
      categories.forEach(category => url.searchParams.append('categories', category));
    }

    return await fetchData(url.toString(), { method: 'GET' });
  },
  createProduct: async function (productData: Product) {
    return fetchData(`${apiUrl}/api/products`, {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },
  findProductByIds: async function (ids: string[]) {
    if (ids.length) {
      const url = new URL(`${apiUrl}/api/products/${ids.join(',')}`);

      return await fetchData(url.toString(), { method: 'GET' });
    } else {
      return [];
    }
  },
  findProductByUserId: async function (userId: string) {
    const url = new URL(`${apiUrl}/api/products/user/${userId}`);

    return await fetchData(url.toString(), { method: 'GET' });
  },
  updateProduct: async function (productData: Product) {
    if (!productData._id) {
      throw new Error('Product ID is required');
    }
    const response = await fetchData(`${apiUrl}/api/products/${productData._id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
    return response.product;
  },
  deleteProduct: async function (_id: string) {
    if (!_id) {
      throw new Error('Product ID is required');
    }

    await fetchData(`${apiUrl}/api/products/${_id}`, { method: 'DELETE' });
  }
};
