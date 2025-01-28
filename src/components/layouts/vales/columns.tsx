import { Checkbox } from "@/components/ui/checkbox";
import { ProjectActions } from "@/components/table/ProjectActions";
import { SortableHeader } from "@/components/table/SortableHeader";
import TruncatedCell from "@/components/table/TruncatedCell";
import { Vale } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Vale>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className=""
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className=" "
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id_vale",
    header: ({ column }) => (
      <SortableHeader column={column} title="id" className="justify-center" />
    ),
    size: 10,
    cell: ({ row }) => (
      <p className="text-center"> {row.getValue("id_vale")} </p>
    ),
  },
  {
    accessorKey: "alumno",
    header: ({ column }) => <SortableHeader column={column} title="name" />,
    size: 30,
  },
  {
    accessorKey: "grupo",
    header: "Grupo",
    size: 50,
    cell: ({ row }) => <TruncatedCell text={row.getValue("grupo")} />,
  },
  {
    accessorKey: "semestre",
    header: "Semestre",
    size: 100,
    cell: ({ row }) => (
      <p className="text-center"> {row.getValue("semestre")} </p>
    ),
  },
  {
    accessorKey: "estado_vale",
    header: "Status",
    size: 50,
  },
  {
    accessorKey: "observaciones_vale",
    header: "Observaciones",
    cell: ({ row }) => (
      <TruncatedCell text={row.getValue("observaciones_vale")} />
    ),
    size: 100,
  },
  {
    accessorKey: "fecha_solicitada",
    header: "Fecha Solicitada",
    cell: ({ row }) => {
      const fecha = new Date(row.getValue("fecha_solicitada"));
      return fecha.toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },
  {
    accessorKey: "fecha_modificacion",
    header: "Fecha Modificación",
    cell: ({ row }) => {
      const fecha = new Date(row.getValue("fecha_modificacion"));
      return fecha.toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },
  {
    accessorKey: "profesor",
    header: "Profesor",
    size: 50,
  },
  {
    accessorKey: "estado_practica",
    header: "Estado Práctica",
    size: 50,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    size: 10,
  },
];
