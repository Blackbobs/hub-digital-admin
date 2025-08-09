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
  sizes?: ProductSize[];  
  colors?: ProductColor[];
  createdAt?: Date;
  updatedAt?: Date;
}


export enum ProductType {
  physical = 'physical',
  digital = 'digital',
}

// export type ProductType = typeof ProductTypeEnum[keyof typeof ProductTypeEnum];
export type StockFilter = "In Stock" | "Low Stock" | "Unlimited" | "";

export enum ProductSize {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

export enum ProductColor {
  RED = 'Red',
  BLUE = 'Blue',
  GREEN = 'Green',
  BLACK = 'Black',
  WHITE = 'White',
  YELLOW = 'Yellow',
  BROWN = 'Brown',
  PURPLE = 'Purple',
  ORANGE = 'Orange',
  PINK = 'Pink',
  // add more named colors as needed
}