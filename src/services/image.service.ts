import { fetchData } from './httpClient';

interface ImageResponse {
  imageUrl: string;
}

interface ImageUpdateParams {
  folder: string;
  oldImageName: string;
  newImageName: string;
}

interface ImageDeleteParams {
  folder: string;
  imageToRemove: string;
}

interface ImageOperationResponse {
  success: boolean;
  message?: string;
}

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const IMAGES_PATH = `${BASE_PATH}/images`;

export const imageService = {
  addImage: async (formData: FormData): Promise<string> => {
    const response = await fetch(`${IMAGES_PATH}`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload an image');
    }

    const data = await response.json() as ImageResponse;
    return data.imageUrl;
  },
  
  updateImage: async (params: ImageUpdateParams): Promise<ImageOperationResponse> => {
    return fetchData(`${IMAGES_PATH}/updated`, {
      method: 'POST',
      body: JSON.stringify(params)
    });
  },
  
  deleteImage: async (params: ImageDeleteParams): Promise<ImageOperationResponse> => {
    return fetchData(`${IMAGES_PATH}/deleted`, {
      method: 'POST',
      body: JSON.stringify(params)
    });
  }
};
