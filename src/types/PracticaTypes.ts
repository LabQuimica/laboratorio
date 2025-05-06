import { Material } from "./MaterialesTypes";

export type EstadoPractica = "pendiente" | "progreso" | "completada" | "cancelada" | "inhabilitada";

export interface StatusChange {
  id_practica: number;
  oldStatus: EstadoPractica;
  newStatus: EstadoPractica;
  nombre: string;
  grupo: string;
}


export interface Practica {
	id: number;
	docente: string;
	nombre: string;
	descripcion: string;
	fecha_creacion: string;
	fecha_modificacion: string;
	esta_asignada: number; // 1 o 0
	grupo: string | null;
	semestre: string | null;
	status: string | null;
	materiales?: Material[];
	id_unique_practica: number | null;
}

export interface CreadorPractica {
	name: string;
	email: string;
	rol: string;
	img: string;
}