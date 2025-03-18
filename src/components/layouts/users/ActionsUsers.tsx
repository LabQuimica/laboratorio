// "use client";

// import { Row } from "@tanstack/react-table";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { IconTrash } from "@tabler/icons-react";
// import { useDeleteUser } from "@/hooks/Users/useUserMutations";
// import { toast } from "@/hooks/use-toast"; // Tu toast personalizado

// interface ProjectActionsProps<TData> {
//   row: Row<TData>;
// }

// export function ActionUser<TData>({ row }: ProjectActionsProps<TData>) {
//   const { mutateAsync } = useDeleteUser();

//   const handleDelete = async () => {
//     if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
//       try {
//         await mutateAsync(row.getValue("id_user"));
//         toast({ title: "Éxito", description: "Usuario eliminado correctamente", open: true });
//       } catch (error: any) {
//         toast({ title: "Error", description: error.message, open: true });
//       }
//     }
//   };

//   return (
//     <Sheet>
//       <div className="flex items-center justify-center">
//         <SheetTrigger>
//           <IconTrash className="cursor-pointer text-red-500" />
//         </SheetTrigger>
//       </div>
//       <SheetContent className="w-[200px] sm:w-[540px]">
//         <SheetHeader>
//           <SheetTitle>Usuario: {row.getValue("name")}</SheetTitle>
//           <SheetDescription>
//             Esta acción eliminará permanentemente al usuario.
//           </SheetDescription>
//         </SheetHeader>
//         <div className="flex justify-end mt-4">
//           <Button variant="destructive" onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700">
//             Eliminar
//           </Button>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }

"use client";

import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  IconEdit,
  IconTrash,
  IconToggleLeftFilled,
  IconToggleRightFilled,
} from "@tabler/icons-react";
import { useDeleteUser, useUpdateUser } from "@/hooks/Users/useUserMutations";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import EditUserModal from "./editUserModal";

interface ActionUserProps<TData> {
  row: Row<TData>;
}

export function ActionUser<TData>({ row }: ActionUserProps<TData>) {
  const user = row.original as any; // Asume que user tiene el tipo User
  const { mutateAsync: deleteUserMutate } = useDeleteUser();
  const { mutateAsync: updateUserMutate } = useUpdateUser();
  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await deleteUserMutate(user.id_user);
        toast({ title: "Éxito", description: "Usuario eliminado correctamente", open: true });
      } catch (error: any) {
        toast({ title: "Error", description: error.message, open: true });
      }
    }
  };

  const handleToggleState = async () => {
    try {
      const newActive = !user.active;
      await updateUserMutate({ id_user: user.id_user, active: newActive });
      toast({ title: "Éxito", description: "Estado actualizado", open: true });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, open: true });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <IconEdit />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleToggleState}>
            {user.active ? (
              <>
                <IconToggleRightFilled className="mr-2 h-4 w-4" /> Desactivar
              </>
            ) : (
              <>
                <IconToggleLeftFilled className="mr-2 h-4 w-4" /> Activar
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <IconEdit className="mr-2 h-4 w-4" /> Modificar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete}>
            <IconTrash className="mr-2 h-4 w-4" /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {editOpen && (
        <EditUserModal
          user={user}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      )}
    </>
  );
}
