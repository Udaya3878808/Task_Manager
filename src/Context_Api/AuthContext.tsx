import { createContext, useContext, useState, useEffect } from "react";
import { login, logout } from "../api/authApi";
import type { LoginPayload } from "../api/authApi";
import toast from "react-hot-toast";

interface AuthContextType {
  user: { userName: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  loginUser: (data: LoginPayload) => Promise<void>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<{ userName: string } | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const loginUser = async (data: LoginPayload) => {
    try {
      const response = await login(data);

      const loggedUser = { userName: data.userName };

      setUser(loggedUser); 
      setToken(response.token);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(loggedUser));

      toast.success("Login successful");
    } catch (error) {
        toast.error("Invalid credentials");
    }
  };

  const logoutUser = async () => {
    try {
      await logout();

      setUser(null);
      setToken(null);

      localStorage.removeItem("token");
      localStorage.removeItem("user"); 
      toast.success("Logged out successfully");
    } catch (error) {
        toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
