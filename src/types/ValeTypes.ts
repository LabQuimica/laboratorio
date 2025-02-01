export interface Vale {
  id_vale: number;
  alumno: string;
  nombre: string;
  semestre: string;
  estado_vale: "pendiente" | "progreso" | "completada" | "cancelada";
  observaciones_vale: string;
  fecha_solicitada: string;
  fecha_modificacion: string;
  profesor: string;
  estado_practica: "pendiente" | "progreso" | "completada" | "cancelada";
}

export type EstadoVale = "pendiente" | "progreso" | "completada" | "cancelada";

export interface StatusChange {
  id_vale: number;
  oldStatus: EstadoVale;
  newStatus: EstadoVale;
}