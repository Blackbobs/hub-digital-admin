import { axiosConfig } from "@/utils/axios-config";
import { Order, OrderStatus } from "@/interface/order";

export interface OrderResponse {
  data: Order[];
  total: number;
}

export const OrderService = {
  getOrders: async (params?: {
    status?: OrderStatus;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<OrderResponse> => {
    const response = await axiosConfig.get<OrderResponse>("/orders", {
      params,
    });
    return response.data;
  },

  getOrder: async (id: string): Promise<Order> => {
    const response = await axiosConfig.get<Order>(`/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async ({
    id,
    status,
  }: {
    id: string;
    status: OrderStatus;
  }): Promise<Order> => {
    const response = await axiosConfig.put<Order>(
      `/orders/${id}/status`,
      { status }
    );
    return response.data;
  },

  deleteOrder: async (id: string): Promise<void> => {
    await axiosConfig.delete(`/orders/${id}`);
  },
};