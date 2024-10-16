const apiUrl = process.env.VUE_APP_API_URL;

export const imageService = {
  addImage: async function (formData: FormData) {
    try {
      const response = await fetch(`${apiUrl}/api/images`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload an image');
      }

      const data = await response.json();
      window.location.reload();
      return data.imageUrl;
    } catch (error) {
      console.log('Error when upload an image:', error);
      throw error;
    }
  }
};
