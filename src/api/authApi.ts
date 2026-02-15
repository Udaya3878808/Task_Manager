import { axiosInstance } from "./config";

export interface LoginPayload {
  userName: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    userName: string;
  };
}

//  login
export const login = async (
  data: LoginPayload
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("login", data);
  return response.data;
};

// logout
export const logout = async (): Promise<void> => {
  await axiosInstance.post("logout");
};
