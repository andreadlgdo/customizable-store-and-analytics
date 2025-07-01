import { Product } from "./product";

export interface TopProduct {
    product: Product;
    viewCount: number;
}

export interface TopPurchasedProduct {
    product: Product;
    totalUnits: number;
}