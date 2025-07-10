import { ProductType } from "./product";

export const OrderStatusEnum = {
  pending: "pending",
  processing: "processing",
  shipped: "shipped",
  delivered: "delivered",
  cancelled: "cancelled",
} as const;

export type OrderStatus = typeof OrderStatusEnum[keyof typeof OrderStatusEnum];

export interface OrderItem {
  product: {
    _id: string;
    title: string;
    price: number;
    type: ProductType;
  };
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentInfo?: {
    method: string;
    reference: string;
  };
  isDigital?: boolean;
  createdAt: string;
  updatedAt: string;
}