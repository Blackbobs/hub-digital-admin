import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { OrderStatus } from "@/interface/order";
import { OrderService } from "@/services/orders.service";

export const useOrders = (params?: {
  status?: OrderStatus;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => OrderService.getOrders(params),
    placeholderData: keepPreviousData, // ✅ keep old list while fetching new
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => OrderService.getOrder(id),
    enabled: !!id,
    placeholderData: (prev) => prev, // ✅ keep old order data while fetching
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: OrderService.updateOrderStatus,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["order", variables.id] });

      // ✅ Optimistic update
      const previousOrder = queryClient.getQueryData(["order", variables.id]);
      queryClient.setQueryData(["order", variables.id], (old: any) => ({
        ...old,
        status: variables.status,
      }));

      return { previousOrder };
    },
    onError: (_err, variables, context) => {
      if (context?.previousOrder) {
        queryClient.setQueryData(["order", variables.id], context.previousOrder);
      }
    },
    onSuccess: (_data, variables) => {
      // ✅ Invalidate order details query so it refetches fresh data
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
      // Also invalidate list query
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};


export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: OrderService.deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
