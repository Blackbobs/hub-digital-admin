import { Product } from '@/interface/product';
import { axiosConfig } from '@/utils/axios-config';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


interface ProductResponse {
  products: Product[];
}

interface CreateProductResponse {
  product: Product;
  message: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosConfig.get<ProductResponse>('/products');
  return response.data.products;
};

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};

export const createProduct = async (formData: FormData): Promise<CreateProductResponse> => {
  try {
    const response = await axiosConfig.post<CreateProductResponse>(
      '/products/create',
      formData,
      {
        headers: { 
          // 'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${(() => {
            const userStorage = localStorage.getItem('user-storage');
            if (!userStorage) return '';
            try {
              const parsed = JSON.parse(userStorage);
              return parsed?.state?.accessToken || '';
            } catch {
              return '';
            }
          })()}`
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.log("❌ Error creating product:", error?.response?.data || error);
    throw new Error(error?.response?.data?.message || "Failed to create product.");
  }
};


export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: any) => {
      console.log("🛑 Mutation error:", error.message);
    },
  });
};


export const updateProduct = async ({ id, formData }: { id: string; formData: FormData }): Promise<CreateProductResponse> => {
  const response = await axiosConfig.put<CreateProductResponse>(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const response = await axiosConfig.delete(`/products/${id}`);
  return response.data;
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};