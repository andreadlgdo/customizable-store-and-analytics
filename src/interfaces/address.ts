export interface Address {
  street: string;
  letter: string;
  number: number;
  code: number;
  city: string;
  country: string;
  label?: string;
  isDefault?: boolean;
}
