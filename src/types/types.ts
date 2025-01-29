export interface User {
    id_user: number;
    name: string;
    email: string;
    password: string;
    date: string;
    rol: "administrador" | "profesor" | "alumno";
    active: number;
  }