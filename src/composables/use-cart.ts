import { ref, watch } from 'vue';

import { useUsers } from '../composables/use-users';
import { orderService } from '../services/order.service';
import { productService } from '../services/product.service';

import { Order, Product, ProductOrder } from '../interfaces';

export function useCart() {
  const { user } = useUsers();

  const userOrders = ref();
  const openOrder = ref(
    userOrders.value?.find((order: Order) => order.status === 'open') ?? undefined
  );

  const getOrdersFromLocalStorage = (): Order[] => {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
  };

  const saveOrdersToLocalStorage = (orders: Order[]) => {
    localStorage.setItem('orders', JSON.stringify(orders));
  };

  const updateOrderFromLocalStorage = (updateOrder: Order) => {
    openOrder.value = { ...openOrder.value, ...updateOrder };

    userOrders.value = userOrders.value?.map((order: Order) =>
      order._id === openOrder.value?._id ? openOrder.value : order
    );

    saveOrdersToLocalStorage(userOrders.value ?? []);
  };

  const addOrderToLocalStorage = (order: Order) => {
    const orders = getOrdersFromLocalStorage();
    orders.push(order);
    saveOrdersToLocalStorage(orders);
  };

  const loadUserOrders = async () => {
    if (user.value && user.value._id) {
      userOrders.value = await orderService.findOrderByUserId(user.value._id);
      openOrder.value = userOrders.value?.find((order: Order) => order.status === 'open');
    } else {
      userOrders.value = getOrdersFromLocalStorage();
      openOrder.value = userOrders.value.find((order: Order) => order.status === 'open');
    }
  };

  const addProduct = async (product: Product, size: string, units: string) => {
    if (!product._id) {
      throw new Error('Product ID are required to add a product.');
    }

    await loadUserOrders();
    const newProduct = { 
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      productId: product._id, 
      size, 
      units 
    };

    if (user.value) {
      if (openOrder.value) {
        const updatedOrder = {
          ...openOrder.value,
          products: [...openOrder.value.products, newProduct],
          total: openOrder.value.total + product.price * parseInt(units)
        };
        openOrder.value = await orderService.updateOrder(updatedOrder);
      } else {
        if (user.value._id && product._id) {
          openOrder.value = await orderService.createOrder({
            userId: user.value._id,
            status: 'open',
            products: [newProduct],
            total: product.price * parseInt(units)
          });
        }
      }
    } else {
      if (openOrder.value) {
        openOrder.value.products.push(newProduct);
        openOrder.value.total += product.price * parseInt(units);
        saveOrdersToLocalStorage(userOrders.value ?? []);
      } else {
        const newOrder: Order = {
          _id: Math.random().toString(),
          userId: 'guest',
          status: 'open',
          products: [newProduct],
          total: product.price * parseInt(units)
        };
        openOrder.value = newOrder;
        addOrderToLocalStorage(newOrder);
      }
    }
  };

  const deleteProduct = async (id: string) => {
    if (!openOrder.value) return;

    if (user.value) {
      const productToDelete = openOrder.value.products.find(
        (product: ProductOrder) => product.id === id || product.productId === id
      );
      
      const updatedProducts = openOrder.value.products.filter(
        (product: ProductOrder) => product.id !== id && (product.id || product.productId !== id)
      );
      
      if (updatedProducts.length) {
        if (productToDelete) {
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
        } else {
          const updatedOrder = {
            ...openOrder.value,
            products: updatedProducts
          };
          openOrder.value = await orderService.updateOrder(updatedOrder);
        }
      } else {
        await orderService.deleteOrder(openOrder.value._id);
        openOrder.value = undefined;
      }
    } else {
      const productToDelete = openOrder.value.products.find(
        (p: ProductOrder) => p.id === id || p.productId === id
      );
      
      openOrder.value.products = openOrder.value.products.filter(
        (p: ProductOrder) => p.id !== id && (p.id || p.productId !== id)
      );
      
      if (productToDelete) {
        const productDetails = await productService.findProductByIds([productToDelete.productId]);
        if (productDetails.length > 0) {
          openOrder.value.total -= productDetails[0].price * parseInt(productToDelete.units);
        }
      }
      
      if (openOrder.value.products.length === 0) {
        userOrders.value = userOrders.value?.filter((order: Order) => order !== openOrder.value);
        openOrder.value = undefined;
      }
      saveOrdersToLocalStorage(userOrders.value ?? []);
    }
  };

  watch(
    () => userOrders.value,
    () => (openOrder.value = userOrders.value?.find((order: Order) => order.status === 'open')),
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
