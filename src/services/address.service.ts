import { fetchData } from './httpClient';
import { Address } from '../interfaces';

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const ADDRESSES_PATH = `${BASE_PATH}/addresses`;

export const addressService = {
  findAddressByUserId: async (userId: string): Promise<Address[]> => {
    const url = new URL(`${ADDRESSES_PATH}/${userId}`);
    return fetchData(url.toString(), { method: 'GET' });
  },
  
  createAddress: async (addressData: Address): Promise<Address> => {
    const response = await fetchData(ADDRESSES_PATH, {
      method: 'POST',
      body: JSON.stringify(addressData)
    });
    return response.address;
  },
  
  updateAddress: async (addressData: Address): Promise<Address> => {
    if (!addressData._id) {
      throw new Error('Address ID is required');
    }
    
    const response = await fetchData(`${ADDRESSES_PATH}/${addressData._id}`, {
      method: 'PUT',
      body: JSON.stringify(addressData)
    });
    
    return response.address;
  },
  
  deleteAddress: async (id: string): Promise<void> => {
    if (!id) {
      throw new Error('Address ID is required');
    }

    return fetchData(`${ADDRESSES_PATH}/${id}`, { method: 'DELETE' });
  }
};
