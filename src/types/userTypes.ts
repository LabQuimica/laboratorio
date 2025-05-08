// Los tupos de datos que se guardrán a la hora de recibir información de la base de datos
export type rolUser = "administrador" | "profesor" | "alumno";

export interface User {
    id_user: number;
    name: string;
    email: string;
    password: string;
    date: string; 
    rol: rolUser;
    active: boolean;
    codigo: string;
    img: string;
  }

export interface AddUserRequest {
  name: string;
  email: string;
  password: string;
  rol: rolUser;
  codigo: string;
}