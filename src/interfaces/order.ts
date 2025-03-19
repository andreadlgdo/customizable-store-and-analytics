export interface Order {
  _id?: string;
  userId: string;
  user?: UserOrder;
  address?: AddressOrder;
  status: string;
  products: ProductOrder[];
  promotionCode?: string;
  total: number;
}

export interface ProductOrder {
  units: string;
  size: string;
  productId: string;
}

export interface UserOrder {
  name: string;
  surname: string;
  email: string;
}

export interface AddressOrder {
  street: string;
  number: string;
  letter: string;
  zipCode: string;
  city: string;
  country: string;
}
