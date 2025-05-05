import { SortableHeader } from "@/components/table/SortableHeader";
import TruncatedCell from "@/components/table/TruncatedCell";
import { ValeProfesor } from "@/types/ValeTypes";
import { ColumnDef } from "@tanstack/react-table";
import { ActionValeProfesor } from "./ActionsValeProfesor";

export const columsProfesorVale: ColumnDef<ValeProfesor>[] = [
  {
    accessorKey: "id_pa",
  },
  {
    accessorKey: "nombre_profesor",
    header: ({ column }) => <SortableHeader column={column} title="Nombre" />,
    size: 30,
  },
  {
    accessorKey: "nombre_materia",
    header: "Materia",
    size: 50,
    cell: ({ row }) => <TruncatedCell text={row.getValue("nombre_materia")} />,
  },
  {
    accessorKey: "semestre",
    header: "Semestre",
    size: 20,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <p className=" uppercase text-sm text-center leading-none">
          {row.getValue("semestre")}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "fecha_asignada",
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Fecha Solicitada"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fecha_asignada")}</div>
    ),
  },
  {
    accessorKey: "fecha_entrega",
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Fecha Entrega"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fecha_entrega")}</div>
    ),
  },
  {
    accessorKey: "nombre_practica",
    header: ({ column }) => (
      <SortableHeader column={column} title="Nombre Práctica" />
    ),
    size: 200,
  },

  {
    accessorKey: "actions",
    header: "Acciones",
    size: 10,
    cell: ({ row }) => (
      <ActionValeProfesor id_practica_asignada={row.getValue("id_pa")} />
    ),
  },
];
