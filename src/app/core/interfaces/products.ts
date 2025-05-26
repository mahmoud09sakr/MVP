export interface Product {
  _id: string;
  name: string;
  price: number;
  priceAfterDiscount: number;
  description: string;
  stock: number;
  sold: number;
  imageCover: string;
  images: string[];
  category: any;
  subCategory: any;
  brand: any;
  tag: any[];
  productType: string;
  isDeleted: boolean;
  deletedAt: any;
  deletedBy: any;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
  reviews: any[];
  id: string;
}
