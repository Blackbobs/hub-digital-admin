import { axiosConfig } from "@/utils/axios-config";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
    address?: string;
    profilePicture?: string;
  };
  accessToken: string;
}

export const AuthService = {
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await axiosConfig.post<LoginResponse>(
      "/users/signin",
      data
    );
    return response.data;
  },

  refreshToken: async () => {
    const response = await axiosConfig.post("/users/refresh");
    return response.data;
  },

  logout: async () => {
    await axiosConfig.post("/users/logout");
  },
};