import { fetchData } from './httpClient';

interface LandingImage {
  id: string;
  url: string;
  alt: string;
}

interface SectionImage extends LandingImage {
  title: string;
}

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const GENERAL_PATH = `${BASE_PATH}/general`;

export const generalService = {
  getLandingImages: async (): Promise<LandingImage[]> => {
    return fetchData(`${GENERAL_PATH}/landing`, { method: 'GET' });
  },
  
  getSectionsImages: async (): Promise<SectionImage[]> => {
    return fetchData(`${GENERAL_PATH}/section`, { method: 'GET' });
  }
};
