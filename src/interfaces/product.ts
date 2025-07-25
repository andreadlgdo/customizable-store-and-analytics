export interface Product {
  _id?: string;
  name: string;
  description: string;
  categories?: string[];
  price: number;
  priceWithDiscount?: number;
  stock?: ProductStock[];
  isUniqueSize?: boolean;
  uniqueStock?: number;
  imageUrl?: string;
  onSale?: boolean;
  isFavouriteUsersIds?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductStock {
  quantity: number;
  size: string;
}
