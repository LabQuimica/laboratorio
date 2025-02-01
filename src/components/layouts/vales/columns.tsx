import { Checkbox } from "@/components/ui/checkbox";
import { ActionVale } from "@/components/layouts/vales/ActionsVale";
import { SortableHeader } from "@/components/table/SortableHeader";
import TruncatedCell from "@/components/table/TruncatedCell";
import { Vale } from "@/types/ValeTypes";
import { ColumnDef } from "@tanstack/react-table";
import formatDateCell from "@/components/table/FormatedDate";
import StatusCell from "./StatusVale";

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
    header: ({ column }) => <SortableHeader column={column} title="ALUMNO" />,
    size: 30,
  },
  {
    accessorKey: "nombre",
    header: "Materia",
    size: 50,
    cell: ({ row }) => <TruncatedCell text={row.getValue("nombre")} />,
  },
  {
    accessorKey: "semestre",
    header: "Semestre",
    size: 20,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <div className=" h-7 w-7 rounded-md flex items-center justify-center">
          <p className=" uppercase text-sm text-center leading-none">
            {row.getValue("semestre")}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "estado_vale",
    header: "Estatus",
    size: 150,
    cell: ({ row }) => <StatusCell row={row} />,
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
    cell: formatDateCell("fecha_solicitada"),
  },
  {
    accessorKey: "fecha_modificacion",
    header: "Fecha Modificación",
    cell: formatDateCell("fecha_modificacion"),
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
    header: "Acciones",
    size: 10,
    cell: ({ row }) => <ActionVale row={row} />,
  },
];
