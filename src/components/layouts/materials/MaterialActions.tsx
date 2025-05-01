// laboratorio/src/components/layouts/materials/MaterialActions.tsx
"use client";

import { Material } from "@/types/material";
import { useDeleteMaterial } from "@/hooks/Materials/useMaterialMutations";
import { useToast } from "@/hooks/use-toast";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface MaterialActionsProps {
  material: Material;
  onEdit: (m: Material) => void;
}

export default function MaterialActions({ material, onEdit }: MaterialActionsProps) {
  const deleteMat = useDeleteMaterial();
  const { toast } = useToast();

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
      <button
        onClick={() => onEdit(material)}
        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
        title="Editar"
      >
        <IconEdit className="h-5 w-5 text-blue-500" />
      </button>
      <button
        onClick={handleDelete}
        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
        title="Eliminar"
      >
        <IconTrash className="h-5 w-5 text-red-500" />
      </button>
    </div>
  );
}
