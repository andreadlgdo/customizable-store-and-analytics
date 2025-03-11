export interface Order {
  _id?: string;
  userId: string;
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
