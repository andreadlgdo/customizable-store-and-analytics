const headers = {
  'Content-Type': 'application/json'
};

const handleError = (error: Error) => {
  throw new Error(error.message || 'Something went wrong');
};

export const fetchData = async (url: string, options: object) => {
  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error: any) {
    handleError(error);
  }
};
