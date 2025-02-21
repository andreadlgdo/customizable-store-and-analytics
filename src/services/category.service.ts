const apiUrl = process.env.VUE_APP_API_URL;

export const categoryService = {
  getCategories: async function () {
    const response = await fetch(`${apiUrl}/api/category`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }
};
