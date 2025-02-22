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

export interface StatusChange {
  id_vale: number;
  oldStatus: EstadoVale;
  newStatus: EstadoVale; 
  tableType: "ValeAlumno" | "ValeProfesor";
}

export interface CommentChange {
  id_vale: number; 
  oldObservation: string; 
  newObservation: string; 
  tableType: "ValeAlumno" | "ValeProfesor";
}

export interface ValeAlumnoDetails {
  id_vale: number
  nombre_alumno: string
  email_alumno: string
  estado_vale: string
  observaciones_vale: string
  fecha_solicitadaVale: string
  fecha_asignadaPA: string
  fecha_entregaPA: string
  practica: ValeAlumnoDetailsPractica
}

export interface ValeAlumnoDetailsPractica {
  id_practica: number
  nombre_practica: string
  nombre_profesor: string
  materiales: ValeAlumnoDetailsMateriale[]
}

export interface ValeAlumnoDetailsMateriale {
  cantidad_material: string
  nombre_item: string
  tipo_item: string
  cantidad_disponible: string
  observacion_item: string
}
