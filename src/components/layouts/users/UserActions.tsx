// laboratorio/src/components/layouts/users/UserActions.tsx
"use client";

import { User } from "@/types/user";
import { useDeleteUser, useUpdateUser } from "@/hooks/Users/useUserMutations";
import { toast } from "@/hooks/use-toast";
import {
  IconEdit,
  IconTrash,
  IconToggleLeftFilled,
  IconToggleRightFilled,
} from "@tabler/icons-react";
import { useState } from "react";
import EditUserModal from "./editUserModal";

interface UserActionsProps {
  user: User;
}

export default function UserActions({ user }: UserActionsProps) {
  const deleteMutation = useDeleteUser();
  const updateMutation = useUpdateUser();
  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm("¿Eliminar usuario?")) return;
    try {
      await deleteMutation.mutateAsync(user.id_user);
      toast({
        title: "Éxito",
        description: "Usuario eliminado",
        open: true,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        open: true,
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async () => {
    try {
      await updateMutation.mutateAsync({
        id_user: user.id_user,
        active: !user.active,
      });
      toast({
        title: "Éxito",
        description: user.active
          ? "Usuario desactivado"
          : "Usuario activado",
        open: true,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        open: true,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Alternar activo/inactivo */}
      <button
        onClick={handleToggleActive}
        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        title={user.active ? "Desactivar" : "Activar"}
      >
        {user.active ? (
            <IconToggleRightFilled className="h-5 w-5 text-green-500" />
        ) : (
            <IconToggleLeftFilled className="h-5 w-5 text-red-500" />
        )}
      </button>

      {/* Editar */}
      <button
        onClick={() => setEditOpen(true)}
        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        title="Modificar"
      >
        <IconEdit className="h-5 w-5 text-blue-500" />
      </button>

      {/* Modal de edición */}
      {editOpen && (
        <EditUserModal
          user={user}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      )}
    </div>
  );
}
