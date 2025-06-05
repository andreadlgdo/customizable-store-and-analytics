import { ref } from 'vue';

import { productService } from '../services';
import { Product } from '../interfaces';

interface LoadProductsParams {
  categories?: string[];
  name?: string;
  order?: string;
}

export function useProducts() {
  const products = ref<Product[]>([]);

  const loadProducts = async ({ categories, name, order }: LoadProductsParams = {}) => {
    products.value = await productService.getProducts(categories, name, order);
  };

  const findProduct = (productId: string) => products.value.find(p => p._id === productId);

  return {
    products,
    loadProducts,
    findProduct
  };
}
