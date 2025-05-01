// laboratorio/src/components/layouts/users/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/table/SortableHeader";
import TruncatedCell from "@/components/table/TruncatedCell";
import { User } from "@/types/user";
import UserActions from "./UserActions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <SortableHeader column={column} title="Correo" />
    ),
    cell: ({ row }) => (
      <TruncatedCell text={row.getValue("email")} />
    ),
  },
  {
    accessorKey: "codigo",
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Boleta"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <p className="text-center">{row.getValue("codigo")}</p>
    ),
  },
  {
    accessorKey: "rol",
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Rol"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <p className="text-center">{row.getValue("rol")}</p>
    ),
  },
  {
    accessorKey: "active",
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Estado"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <p className="text-center">
        {row.getValue("active") ? "Activo" : "Inactivo"}
      </p>
    ),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Acciones"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <UserActions user={row.original} />
      </div>
    ),
  },
];
