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

  const loadUserOrders = async () => {
    userOrders.value = user.value
      ? await orderService.findOrderByUserId(user.value?._id ?? '')
      : [];
    openOrder.value =
      userOrders.value?.find((order: Order) => order.status === 'open') ?? undefined;
  };

  const addProduct = async (product: Product, size: string, units: string) => {
    if (!user.value?._id || !product._id) {
      throw new Error('User ID and Product ID are required to add a product.');
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
    }
  };

  const deleteProduct = async (id: string) => {
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
    deleteProduct,
    loadUserOrders
  };
}
