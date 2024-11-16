import { ref } from 'vue';

import { productService } from '../services';

export function useProducts() {
  const products = ref([]);

  const loadProducts = async () => {
    products.value = await productService.getProducts();
  };

  return {
    products,
    loadProducts
  };
}
