export interface Product {
  _id?: string;
  name: string;
  description: string;
  categories?: string[];
  price: number;
  priceWithDiscount?: number;
  quantity?: number;
  imageUrl?: string;
  onSale?: boolean;
}
