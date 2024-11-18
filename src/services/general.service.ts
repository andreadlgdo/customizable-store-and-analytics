const apiUrl = process.env.VUE_APP_API_URL;

export const generalService = {
  getLandingImages: async function () {
    try {
      const response = await fetch(`${apiUrl}/api/general/landing`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  },
  getSectionsImages: async function () {
    try {
      const response = await fetch(`${apiUrl}/api/general/section`);
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
