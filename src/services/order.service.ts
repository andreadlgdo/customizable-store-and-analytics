import { fetchData } from './httpClient';
import { Order } from '../interfaces';

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const ORDERS_PATH = `${BASE_PATH}/orders`;

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    const url = new URL(ORDERS_PATH);
    return fetchData(url.toString(), { method: 'GET' });
  },
  
  createOrder: async (orderData: Order): Promise<Order> => {
    return fetchData(ORDERS_PATH, {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },
  
  findOrderByUserId: async (userId: string): Promise<Order[]> => {
    const url = new URL(`${ORDERS_PATH}/user/${userId}`);
    return fetchData(url.toString(), { method: 'GET' });
  },
  
  updateOrder: async (orderData: Order): Promise<Order> => {
    if (!orderData._id) {
      throw new Error('Order ID is required');
    }
    
    const response = await fetchData(`${ORDERS_PATH}/${orderData._id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData)
    });
    
    return response.order;
  },
  
  deleteOrder: async (id: string): Promise<void> => {
    if (!id) {
      throw new Error('Order ID is required');
    }

    return fetchData(`${ORDERS_PATH}/${id}`, { method: 'DELETE' });
  }
};
