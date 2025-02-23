import { fetchData } from '../services/httpClient';
import { Address } from '../interfaces';

const apiUrl = process.env.VUE_APP_API_URL;

export const addressService = {
  findAddressByUserId: async function (userId: string) {
    const url = new URL(`${apiUrl}/api/addresses/${userId}`);

    return await fetchData(url.toString(), { method: 'GET' });
  },
  createAddress: async function (addressData: Address) {
    const response = await fetchData(`${apiUrl}/api/addresses`, {
      method: 'POST',
      body: JSON.stringify(addressData)
    });
    return response.address;
  },
  updateAddress: async function (addressData: Address) {
    if (!addressData._id) {
      throw new Error('Address ID is required');
    }
    const response = await fetchData(`${apiUrl}/api/addresses/${addressData._id}`, {
      method: 'PUT',
      body: JSON.stringify(addressData)
    });
    return response.address;
  },
  deleteAddress: async function (_id: string) {
    if (!_id) {
      throw new Error('Address ID is required');
    }

    await fetchData(`${apiUrl}/api/addresses/${_id}`, { method: 'DELETE' });
  }
};
