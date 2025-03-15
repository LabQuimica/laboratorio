// Los tupos de datos que se guardrán a la hora de recibir información de la base de datos
export interface Item {
    id_item: number;
    fk_marca_item: number;
    num_serie: string;
    nombre: string;
    tipo: "kits" | "sensores" | "materiales" | "liquidos" | "solidos"; 
    ubicacion: string;
    cantidad: number;
    observacion: string;
    status: number;
    especial: string;
    fecha_modificacion: string;
  }

export interface ItemAlert {
    id_item: number;
    nombre: string;
    cantidad: number;
    marca: string;
  }

export type tipoItem = "kits" | "sensores" | "materiales" | "liquidos" | "solidos";
