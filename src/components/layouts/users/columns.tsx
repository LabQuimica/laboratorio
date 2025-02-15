import { Checkbox } from "@/components/ui/checkbox";
import { ActionUser } from "@/components/layouts/users/ActionsUsers";
import { SortableHeader } from "@/components/table/SortableHeader";
import TruncatedCell from "@/components/table/TruncatedCell";
import { User } from "@/types/userTypes";
import { ColumnDef } from "@tanstack/react-table";
import formatDateCell from "@/components/table/FormatedDate";
import PasswordCell from "@/components/layouts/users/showPassword";

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
      <SortableHeader column={column} title="Id" className="justify-center" />
    ),
    size: 10,
    cell: ({ row }) => (
      <p className="text-center"> {row.getValue("id_user")} </p>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Nombre" />,
    size: 50,
  },
  {
    accessorKey: "email",
    header: "Correo electrónico",
    size: 50,
    cell: ({ row }) => <TruncatedCell text={row.getValue("email")} />,
  },
  {
    accessorKey: "password",
    header: "Contraseña",
    size: 30,
    cell: ({ row }) => <PasswordCell password={row.getValue("password")} />,
  },
  {
    accessorKey: "date",
    header: "Fecha",
    cell: formatDateCell("date"),
  },
  {
    accessorKey: "rol",
    header: "Rol",
    size: 30,
  },
  {
    accessorKey: "active",
    header: "Estado",
    size: 10,
    cell: ({ row }) => {
      const value = row.getValue("active");
      return (
        <p className="text-center">{value === 1 ? "Activo" : "No activo"}</p>
      );
    },
  },

  {
    accessorKey: "actions",
    header: "Actions",
    size: 10,
    cell: ({ row }) => <ActionUser row={row} />,
  },
];
