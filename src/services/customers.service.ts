import { axiosConfig } from '@/utils/axios-config';
import { useQuery } from '@tanstack/react-query';

export interface Customer {
  _id: string;
  username: string;
  email: string;
  address: string;
  phone?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface CustomerResponse {
  customers: Customer[];
}

const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await axiosConfig.get<CustomerResponse>('/users');
  return response.data.customers;
};

export const useCustomers = () => {
  return useQuery<Customer[]>({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });
};

export const useCustomer = (id: string) => {
  return useQuery<Customer>({
    queryKey: ['customer', id],
    queryFn: async () => {
      const response = await axiosConfig.get(`/users/customer/${id}`)
      return response.data.customer
    },
    enabled: !!id,
  })
}