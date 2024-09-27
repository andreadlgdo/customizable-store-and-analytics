export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isFavorite?: boolean;
  quantity?: number;
}
