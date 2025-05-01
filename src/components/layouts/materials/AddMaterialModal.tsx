// laboratorio/src/components/layouts/materials/AddMaterialModal.tsx
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useCreateMaterial } from "@/hooks/Materials/useMaterialMutations";
import { toast } from "@/hooks/use-toast";
import type { Material } from "@/types/material";

type FormValues = Omit<Material, "id_item" | "fecha_modificacion" | "marca" | "contenido_kit">;

export default function AddMaterialModal() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const createMat = useCreateMaterial();

  const onSubmit = async (data: FormValues) => {
    try {
      await createMat.mutateAsync(data);
      toast({ title: "Agregado", description: "Material agregado con éxito", open: true });
      reset();
      setOpen(false); // Cierra el modal automáticamente
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive", open: true });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nuevo material</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Material</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Número de serie</label>
            <input
              {...register("num_serie", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
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
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
