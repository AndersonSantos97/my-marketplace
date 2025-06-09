import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


export interface AuthContextType {
  token: string | null;
  userId: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && typeof storedToken === "string") {
      try {
        const decoded: any = jwtDecode(storedToken); // asegúrate que el token sea string
        setToken(storedToken);
        setUserId(decoded.sub); // "sub" es el ID del usuario en tu JWT
      } catch (err) {
        console.error("Token inválido o expirado:", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    const decoded: any = jwtDecode(newToken);
    setToken(newToken);
    setUserId(decoded.sub);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return context;
};