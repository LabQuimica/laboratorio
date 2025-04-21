export type EstadoVale = "pendiente" | "progreso" | "completada" | "cancelada" | "incompleto";

export interface Vale {
  id_vale: number;
  alumno: string;
  nombre: string;
  semestre: string;
  estado_vale: EstadoVale;
  observaciones_vale: string;
  fecha_solicitada: string;
  profesor: string;
  nombre_practica: string;
}


export interface StatusChange {
  id_vale: number;
  oldStatus: EstadoVale;
  newStatus: EstadoVale;
  nombre_alumno: string;
}

export interface CommentChange {
  id_vale: number; 
  oldObservation: string; 
  newObservation: string; 
  nombre_alumno: string;
}

export interface ValeAlumnoDetails {
  id_vale: number
  nombre_alumno: string
  email_alumno: string
  boleta: string
  estado_vale: string
  observaciones_vale: string
  fecha_solicitadaVale: string
  fecha_inicio: string
  fecha_fin: string
  practica: ValeAlumnoDetailsPractica
}

export interface ValeAlumnoDetailsPractica {
  id_practica: number
  nombre_practica: string
  nombre_semestre: string
  semestre: string
  nombre_profesor: string
  materiales: ValeAlumnoDetailsMateriale[]
}

export interface ValeAlumnoDetailsMateriale {
  cantidad_material: string
  nombre_item: string
  tipo_item: string
  cantidad_disponible: string
  observacion_item: string
  caracteristica:string
}
// Profesor
export type EstadoValeProfesor = "pendiente" | "progreso" | "completada" | "cancelada" ;

export interface ValeProfesor {
  id_pa: number
  nombre_profesor: string
  nombre_materia: string
  semestre: string
  fecha_asignada: string
  fecha_entrega: string
  nombre_practica: string
  status_practica: EstadoValeProfesor
}

export interface ValeProfesorDetails {
  nombre_usuario: string
  email: string
  nombre_practica: string
  id_practica: number
  id_practica_asignada: number
  status_practica: string
  fecha_asignada: string
  fecha_entrega: string
  nombre_grupo: string
  semestre_grupo: string
  items: ItemProfesor[]
}

export interface ItemProfesor {
  id_item: number
  nombre_item: string
  num_serie: string,
  observacion: string,
  especial: string,
  tipo_item: string
  cantidad_disponible: string
  ubicacion: string
  cantidad_unitaria: string
  contable: number
  cantidad_total_necesaria: string
}
