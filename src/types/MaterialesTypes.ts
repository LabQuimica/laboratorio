// Esto lo incluyen todos los materiales sin importar el tipo
export interface Material {
    id_item: number;
    num_serie: string;
    nombre: string;
    tipo: "kits" | "sensores" | "reactivos-liquidos" | "reactivos-solidos" | "materiales" | "equipos";
    ubicacion: string;
    cantidad: string;
    observacion: string;
    status: number;
    especial: string;
    fecha_modificacion: string;
    marca: string;
    cantidadActual?: string;
}

export interface Kit extends Material {
    tipo: "kits";
    contenido_kit: string | null;
}
  

export interface Sensor extends Material {
    tipo: "sensores";
}
  
export interface Reactivo extends Material {
    tipo: "reactivos-liquidos" | "reactivos-solidos";
}

export interface Materiales extends Material {
    tipo: "materiales";
}

export interface Equipos extends Material {
    tipo: "equipos";
}