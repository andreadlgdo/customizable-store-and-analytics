const apiUrl = process.env.VUE_APP_API_URL;

export const productService = {
  getProducts: async function (categories?: string[]) {
    try {
      const url = new URL(`${apiUrl}/api/products`);
      if (categories?.length) {
        categories.forEach(category => url.searchParams.append('categories', category));
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
};
