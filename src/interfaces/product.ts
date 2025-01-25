export interface Product {
  _id?: string;
  name: string;
  description: string;
  categories?: string[];
  price: number;
  quantity?: number;
  imageUrl?: string;
}
