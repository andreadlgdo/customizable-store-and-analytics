export interface Address {
  _id?: string;
  userId: string;
  street: string;
  letter: string;
  number: string;
  zipCode: string;
  city: string;
  country: string;
  label?: string;
  isDefault?: boolean;
}
