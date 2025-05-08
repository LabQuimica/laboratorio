import { ColumnDef } from "@tanstack/react-table";
import TruncatedCell from "@/components/table/TruncatedCell";
import { ActionUserMenu } from "./ActionUserMenu";
import type { User } from "@/types/user";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    size: 30,
    cell: ({ row }) => <TruncatedCell text={row.getValue("name")} />,
  },
  {
    accessorKey: "email",
    header: "Correo",
    size: 40,
    cell: ({ row }) => <TruncatedCell text={row.getValue("email")} />,
  },
  {
    accessorKey: "codigo",
    header: "Boleta",
    size: 20,
    cell: ({ row }) => <TruncatedCell text={row.getValue("codigo")} />,
  },
  {
    accessorKey: "rol",
    header: "Rol",
    size: 20,
    cell: ({ row }) => <TruncatedCell text={row.getValue("rol")} />,
  },
  {
    accessorKey: "active",
    header: "Estado",
    size: 15,
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
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ActionUserMenu row={row} />
      </div>
    ),
  },
];
