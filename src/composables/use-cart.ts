import { ref, watch } from 'vue';

import { useUsers } from '../composables/use-users';
import { orderService } from '../services/order.service';

import { Order, Product } from '../interfaces';

export function useCart() {
  const { user } = useUsers();

  const userOrders = ref();
  const openOrder = ref(
    userOrders.value?.find((order: Order) => order.status === 'open') ?? undefined
  );

  const loadUserOrders = async () => {
    userOrders.value = user.value
      ? await orderService.findOrderByUserId(user.value?._id ?? '')
      : [];
  };

  const addProduct = async (product: Product, size: string, units: string) => {
    if (!user.value?._id || !product._id) {
      throw new Error('User ID and Product ID are required to add a product.');
    }

    await loadUserOrders();
    openOrder.value =
      userOrders.value?.find((order: Order) => order.status === 'open') ?? undefined;

    const newProduct = { productId: product._id, size, units };

    if (openOrder.value) {
      const updatedOrder = {
        ...openOrder.value,
        products: [...openOrder.value.products, newProduct]
      };
      openOrder.value = await orderService.updateOrder(updatedOrder);
    } else {
      if (user.value?._id && product._id) {
        openOrder.value = await orderService.createOrder({
          userId: user.value._id,
          status: 'open',
          products: [newProduct]
        });
      }
    }
  };

  watch(
    () => userOrders.value,
    () =>
      (openOrder.value =
        userOrders.value?.find((order: Order) => order.status === 'open') ?? undefined),
    { immediate: true }
  );

  return {
    openOrder,
    addProduct,
    loadUserOrders
  };
}
