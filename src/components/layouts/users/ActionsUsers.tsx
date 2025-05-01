// "use client";

// import { Row } from "@tanstack/react-table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import {
//   IconEdit,
//   IconTrash,
//   IconToggleLeftFilled,
//   IconToggleRightFilled,
// } from "@tabler/icons-react";
// import { useDeleteUser, useUpdateUser } from "@/hooks/Users/useUserMutations";
// import { toast } from "@/hooks/use-toast";
// import { useState } from "react";
// import EditUserModal from "./editUserModal";

// interface ActionUserProps<TData> {
//   row: Row<TData>;
// }

// export function ActionUser<TData>({ row }: ActionUserProps<TData>) {
//   const user = row.original as any; // Asume que user tiene el tipo User
//   const { mutateAsync: deleteUserMutate } = useDeleteUser();
//   const { mutateAsync: updateUserMutate } = useUpdateUser();
//   const [editOpen, setEditOpen] = useState(false);

//   const handleDelete = async () => {
//     if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
//       try {
//         await deleteUserMutate(user.id_user);
//         toast({ title: "Éxito", description: "Usuario eliminado correctamente", open: true });
//       } catch (error: any) {
//         toast({ title: "Error", description: error.message, open: true });
//       }
//     }
//   };

//   const handleToggleState = async () => {
//     try {
//       const newActive = !user.active;
//       await updateUserMutate({ id_user: user.id_user, active: newActive });
//       toast({ title: "Éxito", description: "Estado actualizado", open: true });
//     } catch (error: any) {
//       toast({ title: "Error", description: error.message, open: true });
//     }
//   };

//   return (
//     <>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <IconEdit />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuItem onClick={handleToggleState}>
//             {user.active ? (
//               <>
//                 <IconToggleRightFilled className="mr-2 h-4 w-4" /> Desactivar
//               </>
//             ) : (
//               <>
//                 <IconToggleLeftFilled className="mr-2 h-4 w-4" /> Activar
//               </>
//             )}
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => setEditOpen(true)}>
//             <IconEdit className="mr-2 h-4 w-4" /> Modificar
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={handleDelete}>
//             <IconTrash className="mr-2 h-4 w-4" /> Eliminar
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//       {editOpen && (
//         <EditUserModal
//           user={user}
//           open={editOpen}
//           onClose={() => setEditOpen(false)}
//         />
//       )}
//     </>
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
  IconSignLeftFilled,
  IconSignRightFilled,
} from "@tabler/icons-react";
import { useDeleteUser, useUpdateUser } from "@/hooks/Users/useUserMutations";
import { toast } from "@/hooks/use-toast";
import { useContext, useState } from "react";
import EditUserModal from "./editUserModal";
import { UserContext } from "@/context/UserContext";

interface ActionUserProps<TData> {
  row: Row<TData>;
}

export function ActionUser<TData>({ row }: ActionUserProps<TData>) {
  const userData = row.original as any; // Suponemos que es del tipo User
  const { user: currentUser } = useContext(UserContext);
  
  // Si el usuario logueado no es administrador, no se mostrarán las acciones
  if (currentUser?.rol !== "administrador") {
    return null;
  }

  const { mutateAsync: deleteUserMutate } = useDeleteUser();
  const { mutateAsync: updateUserMutate } = useUpdateUser();
  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await deleteUserMutate(userData.id_user);
        toast({ title: "Éxito", description: "Usuario eliminado correctamente", open: true });
      } catch (error: any) {
        toast({ title: "Error", description: error.message, open: true });
      }
    }
  };

  const handleToggleState = async () => {
    try {
      const newActive = !userData.active;
      await updateUserMutate({ id_user: userData.id_user, active: newActive });
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
            {userData.active ? (
              <>
                <IconSignLeftFilled className="mr-2 h-4 w-4" /> Desactivar
              </>
            ) : (
              <>
                <IconSignRightFilled className="mr-2 h-4 w-4" /> Activar
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
        <EditUserModal user={userData} open={editOpen} onClose={() => setEditOpen(false)} />
      )}
    </>
  );
}
