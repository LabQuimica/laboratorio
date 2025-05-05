"use client";

import { Material } from "@/types/material";
import { Button } from "@/components/ui/button";
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
      toast({ title: "Eliminado", description: "Material eliminado con éxito", open: true });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive", open: true });
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <Button variant="ghost" size="icon" onClick={() => onEdit(material)}>
        <IconEdit className="h-5 w-5 text-blue-500" />
      </Button>
      <Button variant="ghost" size="icon" onClick={handleDelete}>
        <IconTrash className="h-5 w-5 text-red-500" />
      </Button>
    </div>
  );
}
