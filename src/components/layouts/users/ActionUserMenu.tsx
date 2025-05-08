"use client";

import { useState, useContext } from "react";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  IconEdit,
  IconToggleLeftFilled,
  IconToggleRightFilled,
} from "@tabler/icons-react";
import { useUpdateUser } from "@/hooks/Users/useUserMutations";
import { toast } from "@/hooks/use-toast";
import { UserContext } from "@/context/UserContext";
import EditUserModal from "./editUserModal";
import type { User } from "@/types/user";

interface Props<TData> {
  row: Row<TData>;
}

export function ActionUserMenu<TData>({ row }: Props<TData>) {
  const userData = row.original as User;
  const { user: me } = useContext(UserContext);
  const [editOpen, setEditOpen] = useState(false);
  const updateUser = useUpdateUser();

  // solo admins
  if (me?.rol !== "administrador") return null;

  const onToggle = async () => {
    try {
      await updateUser.mutateAsync({
        id_user: userData.id_user,
        active: !userData.active,
      });
      toast({
        title: "Éxito",
        description: userData.active
          ? "Usuario desactivado"
          : "Usuario activado",
        open: true,
      });
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
        variant: "destructive",
        open: true,
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Selecciona</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onToggle}>
            {userData.active ? (
              <>
                <IconToggleRightFilled className="mr-2 h-4 w-4 text-green-500" />
                Desactivar
              </>
            ) : (
              <>
                <IconToggleLeftFilled className="mr-2 h-4 w-4 text-red-500" />
                Activar
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <IconEdit className="mr-2 h-4 w-4 text-blue-500" /> Modificar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {editOpen && (
        <EditUserModal
          user={userData}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      )}
    </>
  );
}
