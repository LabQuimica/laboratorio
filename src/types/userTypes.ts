// Los tupos de datos que se guardrán a la hora de recibir información de la base de datos
export interface User {
    id_user: number;
    name: string;
    email: string;
    password: string;
    date: string; 
    rol: "administrador" | "profesor" | "alumno";
    active: number;
  }

export type rolUser = "administrador" | "profesor" | "alumno";
