// laboratorio/src/components/layouts/users/ActionsUsers.tsx
"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  IconEdit,
  IconToggleLeftFilled,
  IconToggleRightFilled,
} from "@tabler/icons-react";
import { useDeleteUser, useUpdateUser } from "@/hooks/Users/useUserMutations";
import { toast } from "@/hooks/use-toast";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import EditUserModal from "./EditUserModal";
import type { User } from "@/types/user";

interface ActionUserProps<TData> {
  row: Row<TData>;
}

export function ActionUser<TData>({ row }: ActionUserProps<TData>) {
  const userData = row.original as User;
  const { user: me } = useContext(UserContext);

  if (me?.rol !== "administrador") return null;

  const deleteMutation = useDeleteUser();  //aun no se usa
  const updateMutation = useUpdateUser();
  const [editOpen, setEditOpen] = useState(false);

  const handleToggleActive = async () => {
    try {
      await updateMutation.mutateAsync({
        id_user: userData.id_user,
        active: !userData.active,
      });
      toast({
        title: "Éxito",
        description: userData.active ? "Usuario desactivado" : "Usuario activado",
        open: true,
      });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, open: true, variant: "destructive" });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Alternar activo/inactivo */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleActive}
        title={userData.active ? "Desactivar" : "Activar"}
      >
        {userData.active ? (
          <IconToggleRightFilled className="h-5 w-5 text-green-500" />
        ) : (
          <IconToggleLeftFilled className="h-5 w-5 text-red-500" />
        )}
      </Button>

      {/* Editar */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setEditOpen(true)}
        title="Modificar"
      >
        <IconEdit className="h-5 w-5 text-blue-500" />
      </Button>

      {/* Modal de edición */}
      {editOpen && (
        <EditUserModal
          user={userData}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      )}
    </div>
  );
}
