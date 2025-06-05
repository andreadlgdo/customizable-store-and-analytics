import { ref } from 'vue';

import { productService } from '../services';
import { Product } from '../interfaces';

interface LoadProductsParams {
  categories?: string[];
  name?: string;
  order?: string;
  discounted?: boolean;
}

export function useProducts() {
  const products = ref<Product[]>([]);

  const loadProducts = async ({ categories, name, order, discounted }: LoadProductsParams = {}) => {
    products.value = await productService.getProducts(categories, name, order, discounted);
  };

  const findProduct = (productId: string) => products.value.find(p => p._id === productId);

  return {
    products,
    loadProducts,
    findProduct
  };
}
