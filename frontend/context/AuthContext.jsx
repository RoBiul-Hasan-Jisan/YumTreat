"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as api from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("yumtreat_token");
    const storedUser = window.localStorage.getItem("yumtreat_user");
    if (storedToken) setToken(storedToken);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // ignore malformed cache
      }
    }
    setReady(true);
  }, []);

  const persist = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    window.localStorage.setItem("yumtreat_token", nextToken);
    window.localStorage.setItem("yumtreat_user", JSON.stringify(nextUser));
  };

  const login = useCallback(async (email, password) => {
    const data = await api.signIn({ email, password });
    persist(data.token, data.user);
    return data.user;
  }, []);

  const register = useCallback(async (email, password, cPassword) => {
    const data = await api.signUp({ email, password, cPassword });
    persist(data.token, data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem("yumtreat_token");
    window.localStorage.removeItem("yumtreat_user");
  }, []);

  const isAdmin = user?.userRole === "admin";

  return (
    <AuthContext.Provider
      value={{ user, token, ready, isAuthenticated: !!token, isAdmin, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
