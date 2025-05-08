// Esto lo incluyen todos los materiales sin importar el tipo
export interface Material {
    id_item: number;
    num_serie: string;
    nombre: string;
    tipo: "kits" | "sensores" | "reactivos-liquidos" | "reactivos-solidos" | "materiales" | "equipos";
    ubicacion: string;
    cantidad: number;
    observacion: string | null;
    status: boolean;
    especial: string | null;
    fecha_modificacion: string;
    marca: string;
    cantidadActual?: string;
    fk_marca_item: number;
}

export interface Kit extends Material {
    tipo: "kits";
    contenido_kit: string | null;
}
  

export interface Sensor extends Material {
    tipo: "sensores";
}

export interface ReactivoLiquido extends Material {
    tipo: "reactivos-liquidos";
}

export interface ReactivoSolido extends Material { 
    tipo: "reactivos-solidos";
}

export interface Materiales extends Material {
    tipo: "materiales";
}

export interface Equipos extends Material {
    tipo: "equipos";
}