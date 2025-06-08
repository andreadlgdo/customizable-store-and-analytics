import { fetchData } from './httpClient';
import { Product } from '../interfaces';

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const PRODUCTS_PATH = `${BASE_PATH}/products`;

export const productService = {
  getProducts: async (categories?: string[], name?: string, order?: string, discounted?: boolean, hasStock?: string, minPrice?: number, maxPrice?: number): Promise<Product[]> => {
    const url = new URL(PRODUCTS_PATH);

    if (categories?.length) {
      categories.forEach(category => url.searchParams.append('categories', category));
    }

    if (name) {
      url.searchParams.append('name', name);
    }

    if (order) {
      url.searchParams.append('order', order);
    }

    if (discounted) {
      url.searchParams.append('discounted', discounted.toString());
    }

    if (hasStock) {
      url.searchParams.append('hasStock', hasStock.toString());
    }

    if (minPrice) {
      url.searchParams.append('minPrice', minPrice.toString());
    }

    if (maxPrice) {
      url.searchParams.append('maxPrice', maxPrice.toString());
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
  },

  getCategoriesWithProductCount: async (
    categories: string[],
    count: number
  ): Promise<Product[]> => {
    const products: Product[] = await productService.getProducts(categories);
    const selected: Product[] = [];
    const seen = new Set<string>();
    
    for (const category of categories) {
      const filtered = products.filter(p => p.categories?.includes(category));
      // Shuffle the filtered products array
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      
      for (const product of shuffled.slice(0, count)) {
        if (product._id && !seen.has(product._id)) {
          selected.push(product);
          seen.add(product._id);
        }
      }
    }
    return selected;
  }
};
