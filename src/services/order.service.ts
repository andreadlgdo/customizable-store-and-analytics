import { fetchData } from '../services/httpClient';
import { Order } from '../interfaces';

const apiUrl = process.env.VUE_APP_API_URL;

export const orderService = {
  getOrders: async function () {
    const url = new URL(`${apiUrl}/api/orders`);

    return await fetchData(url.toString(), { method: 'GET' });
  },
  createOrder: async function (orderData: Order) {
    return fetchData(`${apiUrl}/api/orders`, {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },
  findOrderByUserId: async function (userId: string) {
    const url = new URL(`${apiUrl}/api/orders/user/${userId}`);

    return await fetchData(url.toString(), { method: 'GET' });
  },
  updateOrder: async function (orderData: Order) {
    if (!orderData._id) {
      throw new Error('Order ID is required');
    }
    const response = await fetchData(`${apiUrl}/api/orders/${orderData._id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData)
    });
    return response.order;
  },
  deleteOrder: async function (_id: string) {
    if (!_id) {
      throw new Error('Order ID is required');
    }

    await fetchData(`${apiUrl}/api/orders/${_id}`, { method: 'DELETE' });
  }
};
