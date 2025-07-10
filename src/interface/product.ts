export interface Product {
  _id: string;
  title: string;
  description?: string;
  price: number;
  type: ProductType;
  stock?: number;
  images?: {
    url: string;
    publicId: string;
  }[];
  file?: {
    url: string;
    publicId: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}


export enum ProductType {
  physical = 'physical',
  digital = 'digital',
}

// export type ProductType = typeof ProductTypeEnum[keyof typeof ProductTypeEnum];
export type StockFilter = "In Stock" | "Low Stock" | "Unlimited" | "";