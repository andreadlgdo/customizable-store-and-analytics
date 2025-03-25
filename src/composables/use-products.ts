import { ref } from 'vue';

import { productService } from '../services';
import { Product } from '../interfaces';

export function useProducts() {
  const products = ref<Product[]>([]);

  const loadProducts = async (categories?: string[]) => {
    products.value = await productService.getProducts(categories);
  };

  const findProduct = (productId: string) => products.value.find(p => p._id === productId);

  return {
    products,
    loadProducts,
    findProduct
  };
}
