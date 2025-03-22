"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { User } from "@/types/user";
import { getUserFromToken } from "@/services/userService";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  setLoading: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Función que se encarga de rehidratar el usuario
  const rehydrateUser = () => {
    // Evita rehidratar si estamos en la página de login
    if (
      typeof window !== "undefined" &&
      window.location.pathname === "/login"
    ) {
      setLoading(false);
      return;
    }

    // Intenta obtener el usuario desde localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
      return;
    }

    // Si no hay usuario en localStorage, intenta obtenerlo a partir del token
    const token = Cookies.get("token");
    if (token) {
      const userFromToken = getUserFromToken(token);
      if (userFromToken) {
        setUser(userFromToken);
        localStorage.setItem("user", JSON.stringify(userFromToken));
      } else {
        Cookies.remove("token");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    rehydrateUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
