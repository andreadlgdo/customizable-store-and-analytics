import { fetchData } from './httpClient';

const apiUrl = process.env.VUE_APP_API_URL || '';
const BASE_PATH = `${apiUrl}/api`;
const EMAIL_PATH = `${BASE_PATH}/email`;

interface EmailParams {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const emailService = {
  sendEmail: async (params: EmailParams): Promise<void> => {
    if (!params.text && !params.html) {
      throw new Error('Either text or HTML content is required');
    }
    
    return fetchData(`${EMAIL_PATH}/send`, {
      method: 'POST',
      body: JSON.stringify(params)
    });
  }
}; 