export interface Category {
  _id?: string;
  title: string;
  imageUrl: string;
  parentId?: string;
  relatedId?: string[];
}
