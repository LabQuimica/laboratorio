import { ColumnDef } from "@tanstack/react-table";
import TruncatedCell from "@/components/table/TruncatedCell";
import { ActionUserMenu } from "./ActionUserMenu";
import type { User } from "@/types/userTypes";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    size: 30,
    enableResizing: false,
    cell: ({ row }) => <TruncatedCell text={row.getValue("name")} />,
  },
  {
    accessorKey: "email",
    header: "Correo",
    size: 40,
    enableResizing: false,
    cell: ({ row }) => <TruncatedCell text={row.getValue("email")} />,
  },
  {
    accessorKey: "codigo",
    header: "Boleta",
    size: 20,
    enableResizing: false,
    cell: ({ row }) => (
      <p className="text-center">
        {row.getValue("codigo")}
      </p>
    ),
  },
  {
    accessorKey: "rol",
    header: "Rol",
    size: 20,
    enableResizing: false,
    cell: ({ row }) => (
      <p className="text-center">
        {row.getValue("rol")}
      </p>
    ),
  },
  {
    accessorKey: "active",
    header: "Estado",
    size: 15,
    enableResizing: false,
    cell: ({ row }) => (
      <p className="text-center">
        {row.getValue("active") ? "Activo" : "Inactivo"}
      </p>
    ),
  },
  {
    id: "actions",
    header: "Acciones",
    size: 15,
    enableResizing: false,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ActionUserMenu row={row} />
      </div>
    ),
  },
];
