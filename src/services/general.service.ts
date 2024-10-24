const apiUrl = process.env.VUE_APP_API_URL;

export const generalService = {
  getLandingImage: async function () {
    try {
      const response = await fetch(`${apiUrl}/api/general/landing`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const image = await response.json();
      return image[0];
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
};
