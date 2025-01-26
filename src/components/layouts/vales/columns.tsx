import { Vale } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Vale>[] = [
  {
    accessorKey: "id_vale",
    header: "ID",
  },
  {
    accessorKey: "alumno",
    header: "Alumno",
  },
  {
    accessorKey: "grupo",
    header: "Grupo",
  },
  {
    accessorKey: "semestre",
    header: "Semestre",
  },
  {
    accessorKey: "estado_vale",
    header: "Estado Vale",
  },
  {
    accessorKey: "observaciones_vale",
    header: "Observaciones",
  },
  {
    accessorKey: "fecha_solicitada",
    header: "Fecha Solicitada",
  },
  {
    accessorKey: "fecha_modificacion",
    header: "Fecha Modificación",
  },
  {
    accessorKey: "profesor",
    header: "Profesor",
  },
  {
    accessorKey: "estado_practica",
    header: "Estado Práctica",
  },
];
