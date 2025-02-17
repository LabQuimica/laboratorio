// src/services/userService.ts
import { jwtDecode } from "jwt-decode";
import { User } from "@/types/user";

export function getUserFromToken(token: string): User | null {
  try {
    const decoded: any = jwtDecode(token);
    const user: User = {
      id_user: decoded.id,
      name: decoded.name,
      email: decoded.email,
      date: decoded.date || new Date().toISOString(),
      rol: decoded.rol,  // se asume que el token siempre envía un valor válido
      active: true,
    };
    return user;
  } catch (error) {
    return null;
  }
}