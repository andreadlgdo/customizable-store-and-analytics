import { ref } from 'vue';
import { productService } from '../services/product.service';

export function useProducts() {
  const products = ref([]);
  const loading = ref(false);

  const fetchProducts = async () => {
    try {
      loading.value = true;
      products.value = await productService.getProducts();
    } catch (error) {
      console.log('error', error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    loading,
    fetchProducts
  };
}
