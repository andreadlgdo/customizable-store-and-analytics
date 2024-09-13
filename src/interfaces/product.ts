export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isFavorite?: boolean;
  quantity?: number;
}
