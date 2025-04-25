import { ref, watch, Ref } from 'vue';

import { useUsers } from './use-users';
import { orderService } from '../services/order.service';
import { productService } from '../services/product.service';

import { Order, Product, ProductOrder } from '../interfaces';

interface CartComposable {
  openOrder: Ref<Order | undefined>;
  updateOrderFromLocalStorage: (updateOrder: Order) => void;
  saveOrdersToLocalStorage: (orders: Order[]) => void;
  addProduct: (product: Product, size: string, units: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadUserOrders: () => Promise<void>;
}

const LOCAL_STORAGE_KEY = 'orders';

export function useCart(): CartComposable {
  const { user } = useUsers();

  const userOrders = ref<Order[]>([]);
  const openOrder = ref<Order | undefined>(undefined);

  // Local Storage Helper Functions
  const getOrdersFromLocalStorage = (): Order[] => {
    const orders = localStorage.getItem(LOCAL_STORAGE_KEY);
    return orders ? JSON.parse(orders) : [];
  };

  const saveOrdersToLocalStorage = (orders: Order[]): void => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
  };

  const updateOrderFromLocalStorage = (updateOrder: Order): void => {
    if (!openOrder.value) return;
    
    openOrder.value = { ...openOrder.value, ...updateOrder };

    userOrders.value = userOrders.value.map((order: Order) =>
      order._id === openOrder.value?._id ? openOrder.value : order
    ).filter((order): order is Order => order !== undefined);

    saveOrdersToLocalStorage(userOrders.value);
  };

  const addOrderToLocalStorage = (order: Order): void => {
    const orders = getOrdersFromLocalStorage();
    orders.push(order);
    saveOrdersToLocalStorage(orders);
  };

  // Main Cart Functions
  const loadUserOrders = async (): Promise<void> => {
    if (user.value?._id) {
      userOrders.value = await orderService.findOrderByUserId(user.value._id);
      openOrder.value = userOrders.value.find((order: Order) => order.status === 'open');
    } else {
      userOrders.value = getOrdersFromLocalStorage();
      openOrder.value = userOrders.value.find((order: Order) => order.status === 'open');
    }
  };

  const generateUniqueId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const addProduct = async (product: Product, size: string, units: string): Promise<void> => {
    if (!product._id) {
      throw new Error('Product ID is required to add a product.');
    }

    await loadUserOrders();
    
    const newProduct: ProductOrder = { 
      id: generateUniqueId(),
      productId: product._id, 
      size, 
      units 
    };

    const productTotal = product.price * parseInt(units);

    if (user.value) {
      await addProductForAuthenticatedUser(newProduct, productTotal);
    } else {
      addProductForGuestUser(newProduct, productTotal);
    }
  };

  const addProductForAuthenticatedUser = async (
    newProduct: ProductOrder, 
    productTotal: number
  ): Promise<void> => {
    if (openOrder.value) {
      const updatedOrder = {
        ...openOrder.value,
        products: [...openOrder.value.products, newProduct],
        total: openOrder.value.total + productTotal
      };
      openOrder.value = await orderService.updateOrder(updatedOrder);
    } else if (user.value?._id) {
      openOrder.value = await orderService.createOrder({
        userId: user.value._id,
        status: 'open',
        products: [newProduct],
        total: productTotal
      });
    }
  };

  const addProductForGuestUser = (
    newProduct: ProductOrder, 
    productTotal: number
  ): void => {
    if (openOrder.value) {
      openOrder.value.products.push(newProduct);
      openOrder.value.total += productTotal;
      updateOrderFromLocalStorage(openOrder.value);
    } else {
      const newOrder: Order = {
        _id: generateUniqueId(),
        userId: 'guest',
        status: 'open',
        products: [newProduct],
        total: productTotal
      };
      openOrder.value = newOrder;
      addOrderToLocalStorage(newOrder);
      userOrders.value.push(newOrder);
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    if (!openOrder.value) return;

    if (user.value) {
      await deleteProductForAuthenticatedUser(id);
    } else {
      await deleteProductForGuestUser(id);
    }
  };

  const deleteProductForAuthenticatedUser = async (id: string): Promise<void> => {
    if (!openOrder.value) return;

    const productToDelete = findProductById(id);
    const updatedProducts = filterProductsExcept(id);
    
    if (updatedProducts.length) {
      if (productToDelete) {
        await updateOrderWithoutProduct(productToDelete, updatedProducts);
      } else {
        await updateOrderWithNewProducts(updatedProducts);
      }
    } else {
      await orderService.deleteOrder(openOrder.value._id || '');
      openOrder.value = undefined;
    }
  };

  const deleteProductForGuestUser = async (id: string): Promise<void> => {
    if (!openOrder.value) return;

    const productToDelete = findProductById(id);
    openOrder.value.products = filterProductsExcept(id);
    
    if (productToDelete) {
      await updateLocalOrderTotal(productToDelete);
    }
    
    if (openOrder.value.products.length === 0) {
      userOrders.value = userOrders.value.filter(
        (order: Order) => order._id !== openOrder.value?._id
      );
      openOrder.value = undefined;
    }
    
    saveOrdersToLocalStorage(userOrders.value);
  };

  // Helper functions for deleteProduct
  const findProductById = (id: string): ProductOrder | undefined => {
    return openOrder.value?.products.find(
      (product: ProductOrder) => product.id === id || product.productId === id
    );
  };

  const filterProductsExcept = (id: string): ProductOrder[] => {
    return openOrder.value?.products.filter(
      (product: ProductOrder) => product.id !== id && (product.id || product.productId !== id)
    ) || [];
  };

  const updateOrderWithoutProduct = async (
    productToDelete: ProductOrder, 
    updatedProducts: ProductOrder[]
  ): Promise<void> => {
    if (!openOrder.value) return;
    
    const productDetails = await productService.findProductByIds([productToDelete.productId]);
    
    if (productDetails.length > 0) {
      const productPrice = productDetails[0].price * parseInt(productToDelete.units);
      
      const updatedOrder = {
        ...openOrder.value,
        products: updatedProducts,
        total: openOrder.value.total - productPrice
      };
      
      openOrder.value = await orderService.updateOrder(updatedOrder);
    }
  };

  const updateOrderWithNewProducts = async (updatedProducts: ProductOrder[]): Promise<void> => {
    if (!openOrder.value) return;
    
    const updatedOrder = {
      ...openOrder.value,
      products: updatedProducts
    };
    
    openOrder.value = await orderService.updateOrder(updatedOrder);
  };

  const updateLocalOrderTotal = async (productToDelete: ProductOrder): Promise<void> => {
    if (!openOrder.value) return;
    
    const productDetails = await productService.findProductByIds([productToDelete.productId]);
    
    if (productDetails.length > 0) {
      openOrder.value.total -= productDetails[0].price * parseInt(productToDelete.units);
    }
  };

  // Watch for changes to userOrders
  watch(
    () => userOrders.value,
    () => {
      openOrder.value = userOrders.value.find((order: Order) => order.status === 'open');
    },
    { immediate: true }
  );

  return {
    openOrder,
    updateOrderFromLocalStorage,
    saveOrdersToLocalStorage,
    addProduct,
    deleteProduct,
    loadUserOrders
  };
}
