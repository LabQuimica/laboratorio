"use client";

import { Material } from "@/types/MaterialesTypes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useDeleteMaterial } from "@/hooks/Materials/useMaterialMutations";
import { toast } from "@/hooks/use-toast";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface MaterialActionsProps {
  material: Material;
  onEdit: (m: Material) => void;
}

export default function MaterialActions({
  material,
  onEdit,
}: MaterialActionsProps) {
  const deleteMat = useDeleteMaterial();

  const handleDelete = async () => {
    if (!confirm("¿Eliminar este material?")) return;
    try {
      await deleteMat.mutateAsync(material.id_item);
      toast({
        title: "Eliminado",
        description: "Material eliminado con éxito",
        open: true,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
        open: true,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          Acciones
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(material)}>
          <IconEdit className="mr-2 h-4 w-4 text-blue-500" />
          Modificar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <IconTrash className="mr-2 h-4 w-4 text-red-500" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
