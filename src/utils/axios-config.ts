// src/utils/axios-config.ts
import { useAuthStore } from "@/store/useUserStore";
import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, 
});

axiosConfig.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearUser();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);