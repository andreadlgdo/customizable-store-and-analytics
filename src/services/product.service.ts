import { Product } from '../interfaces';

const apiUrl = process.env.VUE_APP_API_URL;

export const productService = {
  getProducts: async function (categories?: string[]) {
    const url = new URL(`${apiUrl}/api/products`);

    if (categories?.length) {
      categories.forEach(category => url.searchParams.append('categories', category));
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  },
  createProduct: async function (productData: Product) {
    const response = await fetch(`${apiUrl}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      throw new Error('Failed to create a product');
    }

    return await response.json();
  },
  updateProduct: async function (productData: Product) {
    if (!productData._id) {
      console.log('The product does not have an id');
      return;
    }

    const response = await fetch(`${apiUrl}/api/products/${productData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    const responseJson = await response.json();
    return responseJson.product;
  },
  deleteProduct: async function (_id: string) {
    if (!_id) {
      console.log('El producto no tiene un ID');
      return;
    }

    const response = await fetch(`${apiUrl}/api/products/${_id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }
  }
};
