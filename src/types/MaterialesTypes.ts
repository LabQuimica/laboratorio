// Esto lo incluyen todos los materiales sin importar el tipo
export interface Material {
    id_item: number;
    num_serie: string;
    nombre: string;
    tipo: "kits" | "sensores" | "liquidos" | "solidos";
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
  

export interface Liquido extends Material {
    tipo: "liquidos";
}
  

export interface Solido extends Material {
    tipo: "solidos";
}