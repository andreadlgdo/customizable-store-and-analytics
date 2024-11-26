import { ref } from 'vue';

import { productService } from '../services';

export function useProducts() {
  const products = ref([]);

  const loadProducts = async (categories?: string[]) => {
    products.value = await productService.getProducts(categories);
  };

  return {
    products,
    loadProducts
  };
}
