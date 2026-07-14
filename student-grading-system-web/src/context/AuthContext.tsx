import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface AuthContextType {
  accessToken: string | null;

  login: (
    accessToken: string,
    refreshToken: string
  ) => void;

  logout: () => void;

  isAuthenticated: boolean;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accessToken, setAccessToken] =
    useState<string | null>(null);

  useEffect(() => {
    const token =
      localStorage.getItem("accessToken");

    if (token) {
      setAccessToken(token);
    }
  }, []);

  const login = (
    accessToken: string,
    refreshToken: string
  ) => {
    localStorage.setItem(
      "accessToken",
      accessToken
    );

    localStorage.setItem(
      "refreshToken",
      refreshToken
    );

    setAccessToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");

    localStorage.removeItem("refreshToken");

    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        login,
        logout,
        isAuthenticated:
          !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}