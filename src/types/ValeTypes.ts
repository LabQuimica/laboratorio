export interface Vale {
  id_vale: number;
  alumno: string;
  nombre: string;
  semestre: string;
  estado_vale: "pendiente" | "progreso" | "completada" | "cancelada" | "incompleto";
  observaciones_vale: string;
  fecha_solicitada: string;
  profesor: string;
  nombre_practica: string;
}

export type EstadoVale = "pendiente" | "progreso" | "completada" | "cancelada" | "incompleto";

// Tipo para el cambio de estado
export interface StatusChange {
  id_vale: number;
  oldStatus: EstadoVale;
  newStatus: EstadoVale; 
  tableType: "ValeAlumno" | "ValeProfesor";
}

// Tipo para el cambio de comentario
export interface CommentChange {
  id_vale: number; 
  oldObservation: string; 
  newObservation: string; 
  tableType: "ValeAlumno" | "ValeProfesor";
}