export function useValidations() {
  const validEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isNumber = (value: string): boolean => {
    const regex = /^[0-9]+$/;
    return regex.test(value);
  };

  return {
    validEmail,
    isNumber
  };
}
