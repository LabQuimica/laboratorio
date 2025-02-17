// src/types/user.ts
export type Rol = "administrador" | "profesor" | "alumno";

export interface User {
  id_user: number;
  name: string;
  email: string;
  date: string;
  rol: Rol;
  active: boolean;
}
