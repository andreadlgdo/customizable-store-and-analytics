const apiUrl = process.env.VUE_APP_API_URL;

export const imageService = {
  addImage: async function (formData: FormData) {
    const response = await fetch(`${apiUrl}/api/images`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload an image');
    }

    const data = await response.json();
    return data.imageUrl;
  },
  updateImage: async function (folder: string, oldImageName: string, newImageName: string) {
    const response = await fetch(`${apiUrl}/api/images/updated`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        folder,
        oldImageName,
        newImageName
      })
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la imagen');
    }

    return response.json();
  }
};
