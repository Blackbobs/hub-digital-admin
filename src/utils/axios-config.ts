// src/utils/axios-config.ts
import { useAuthStore } from "@/store/useUserStore";
import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "http://192.168.113.86:5050/api/v1",
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