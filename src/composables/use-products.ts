import { ref, computed } from 'vue';

import { productService } from '../services';
import { Product } from '../interfaces';

interface LoadProductsParams {
  categories?: string[];
  name?: string;
  order?: string;
  discounted?: boolean;
  hasStock?: string;
  minPrice?: number;
  maxPrice?: number;
}

export function useProducts() {
  const products = ref<Product[]>([]);

  const loadProducts = async ({ categories, name, order, discounted, hasStock, minPrice, maxPrice }: LoadProductsParams = {}) => {
    products.value = await productService.getProducts(categories, name, order, discounted, hasStock, minPrice, maxPrice);
  };

  const findProduct = (productId: string) => products.value.find(p => p._id === productId);

  const getHighestPricedProduct = () => {
    if (products.value.length === 0) return 0;
    
    return products.value.reduce((highest, current) => {
      const currentPrice = current.priceWithDiscount || current.price;
      const highestPrice = highest.priceWithDiscount || highest.price;
      
      return currentPrice > highestPrice ? current : highest;
    });
  };

  const getLowestPricedProduct = () => {
    if (products.value.length === 0) return 0;
    
    return products.value.reduce((lowest, current) => {
      const currentPrice = current.priceWithDiscount || current.price;
      const lowestPrice = lowest.priceWithDiscount || lowest.price;
      
      return currentPrice < lowestPrice ? current : lowest;
    });
  };

  const priceRange = computed<{min: number, max: number}[]>(() => {
    const highest = getHighestPricedProduct();
    const lowest = getLowestPricedProduct();

    if (!highest || !lowest) return [];

    const highestPrice = highest.priceWithDiscount || highest.price;
    const lowestPrice = lowest.priceWithDiscount || lowest.price;
    const range = highestPrice - lowestPrice;
    const step = range / 6;

    return Array.from({ length: 6 }, (_, index) => ({
      min: Math.round(lowestPrice + (step * index)),
      max: Math.round(lowestPrice + (step * (index + 1)))
    }));
  });

  return {
    products,
    priceRange,
    loadProducts,
    findProduct
  };
}
