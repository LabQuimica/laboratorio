// laboratorio/src/context/UserContext.tsx
"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

export type Rol = "administrador" | "profesor" | "alumno";

export interface User {
  id_user: number;
  name: string;
  email: string;
  date: string;
  rol: Rol;
  active: boolean;
}

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

  useEffect(() => {
    // Evitar rehidratación en la página de login
    if (typeof window !== "undefined" && window.location.pathname === "/login") {
      setLoading(false);
      return;
    }

    // Si ya tenemos un usuario, no volvemos a llamar
    if (user) {
      setLoading(false);
      return;
    }

    const token = Cookies.get("token");
    console.log("Token from cookie:", token);
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log("Response status from /auth/me:", res.status);
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error("Error al obtener el usuario: " + text);
            });
          }
          return res.json();
        })
        .then((data) => {
          console.log("Data from /auth/me:", data);
          setUser(data.user);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error rehidratando usuario:", error);
          Cookies.remove("token");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
