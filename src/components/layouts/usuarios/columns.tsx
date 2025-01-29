import { Checkbox } from "@/components/ui/checkbox";
import {ActionUser } from "@/components/layouts/usuarios/actionsUser";
import { SortableHeader } from "@/components/table/SortableHeader";
import TruncatedCell from "@/components/table/TruncatedCell";
import { User } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import formatDateCell from "@/components/table/FormatedDate";

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "id_user",
    header: ({ column }) => (
      <SortableHeader column={column} title="id" className="justify-center" />
    ),
    size: 10,
    cell: ({ row }) => (
      <p className="text-center"> {row.getValue("id_user")} </p>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="name" />,
    size: 30,
  },
  {
    accessorKey: "email",
    header: "Correo",
    size: 50,
    cell: ({ row }) => <TruncatedCell text={row.getValue("email")} />,
  },
  {
    accessorKey: "password",
    header: "Contraseña",
    size: 20,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <div className="bg-colortable black:bg-gray-200 h-7 w-7 rounded-md flex items-center justify-center">
          <p className="text-white uppercase text-sm text-center leading-none">
            {row.getValue("password")}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "rol",
    header: "Rol",
    size: 150,
    cell: ({ row }) => (
      <p className="text-center"> {row.getValue("rol")} </p>
    ),
  },
  {
    accessorKey: "date",
    header: "Fecha de creación",
    cell: formatDateCell("date"),
  },
  {
    accessorKey: "active",
    header: "Activo",
    size: 20,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <div className="bg-colortable black:bg-gray-200 h-7 w-7 rounded-md flex items-center justify-center">
          <p className="text-white uppercase text-sm text-center leading-none">
            {row.getValue("active")}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    size: 10,
    cell: ({ row }) => <ActionUser row={row} />,
  },
];