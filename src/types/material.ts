// laboratorio/src/types/material.ts
export interface Material {
  id_item: number;
  num_serie: string;
  nombre: string;
  tipo: "kits" | "sensores" | "materiales" | "reactivos" | "equipos";
  ubicacion: string | null;
  cantidad: number;
  observacion: string | null;
  status: boolean;
  especial: string | null;
  fecha_modificacion: string;
  marca: string | null;
  fk_marca_item: number;
  contenido_kit?: string; // sólo para kits
}
