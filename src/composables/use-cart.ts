import { ref, watch } from 'vue';

import { useUsers } from '../composables/use-users';
import { orderService } from '../services/order.service';

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
    const newProduct = { productId: product._id, size, units };

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
      const saveProducts = openOrder.value.products.filter(
        (product: ProductOrder) => product.productId !== id
      );
      if (saveProducts.length) {
        const updatedOrder = {
          ...openOrder.value,
          products: openOrder.value.products.filter(
            (product: ProductOrder) => product.productId !== id
          )
        };
        openOrder.value = await orderService.updateOrder(updatedOrder);
      } else {
        await orderService.deleteOrder(openOrder.value._id);
        openOrder.value = undefined;
      }
    } else {
      openOrder.value.products = openOrder.value.products.filter(
        (p: ProductOrder) => p.productId !== id
      );
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
    addProduct,
    deleteProduct,
    loadUserOrders
  };
}
