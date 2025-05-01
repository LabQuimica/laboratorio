// laboratorio/src/components/layouts/materials/EditMaterialModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useUpdateMaterial } from "@/hooks/Materials/useMaterialMutations";
import { toast } from "@/hooks/use-toast";
import type { Material } from "@/types/material";
import { IconEdit } from "@tabler/icons-react";

interface Props {
  mat: Material;
  open: boolean;
  onClose: () => void;
}

type FormValues = Omit<Material, "fecha_modificacion" | "marca" | "id_item">;

export default function EditMaterialModal({ mat, open, onClose }: Props) {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      nombre: mat.nombre,
      tipo: mat.tipo,
      cantidad: mat.cantidad,
      ubicacion: mat.ubicacion,
      observacion: mat.observacion,
      especial: mat.especial,
    },
  });
  const updateMat = useUpdateMaterial();

  const onSubmit = async (data: FormValues) => {
    try {
      await updateMat.mutateAsync({ ...mat, ...data });
      toast({ title: "Actualizado", description: "Material modificado con éxito", open: true });
      onClose(); // Cierra el modal automáticamente
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive", open: true });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <IconEdit className="h-5 w-5 text-blue-500" />
              Editar Material
            </div>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Nombre</label>
            <input
              {...register("nombre", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Tipo</label>
            <select
              {...register("tipo", { required: true })}
              className="w-full p-2 border rounded"
            >
              <option value="reactivos">Reactivos</option>
              <option value="sensores">Sensores</option>
              <option value="materiales">Materiales</option>
              <option value="kits">Kits</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Cantidad</label>
            <input
              type="number"
              step="1"
              {...register("cantidad", { valueAsNumber: true, required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Ubicación</label>
            <input
              {...register("ubicacion")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Observación</label>
            <input
              {...register("observacion")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Especial</label>
            <input
              {...register("especial")}
              className="w-full p-2 border rounded"
            />
          </div>
          <Button type="submit" className="bg-blue-600 text-white">
            Guardar Cambios
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
