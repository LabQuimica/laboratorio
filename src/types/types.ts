export interface Vale {
  id_vale: number;
  alumno: string;
  grupo: string;
  semestre: number;
  estado_vale: "pendiente" | "progreso" | "completado";
  observaciones_vale: string;
  fecha_solicitada: string;
  fecha_modificacion: string;
  profesor: string;
  estado_practica: "pendiente" | "progreso" | "completado";
}