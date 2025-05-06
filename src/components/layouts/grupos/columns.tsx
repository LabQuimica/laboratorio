import { Grupo } from "@/types/GroupTypes";
import { ColumnDef } from "@tanstack/react-table";
import ObtenerCodigo from "./ObtenerCodigo";
import { SortableHeader } from "@/components/table/SortableHeader";

export const gruposcolumns: ColumnDef<Grupo>[] = [
  {
    accessorKey: "id_grupo",
    header: ({ column }) => (
    <SortableHeader column={column} title="Id" className="justify-center" />
    ),
    size: 10,
    cell: ({ row }) => (
      <p className="text-center"> {row.getValue("id_grupo")} </p>
    ),
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "semestre",
    header: "Semestre",
    size: 10,
    cell: ({ row }) => (
        <p className="text-center"> {row.getValue("semestre")} </p>
      ),
  },
  {
    accessorKey: "acciones",
    header: "Acciones",
    size: 10,
    cell: ({ row }) => (
        <div className="flex w-full items-center justify-center align-middle">
            <ObtenerCodigo idGrupo={row.getValue("id_grupo")}/>
        </div>
    ),
  }
];