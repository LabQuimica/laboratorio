// laboratorio/src/components/layouts/materials/AddMaterialModal.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { useCreateMaterial } from "@/hooks/Materials/useMaterialMutations";
import { toast } from "@/hooks/use-toast";
import type { Material } from "@/types/material";

type FormValues = Omit<
  Material,
  "id_item" | "fecha_modificacion" | "marca" | "contenido_kit"
>;

// Lista de ubicaciones únicas (puedes poblarla dinámicamente si lo prefieres)
const LOCATIONS = [
  "Estante abierto 1, Nivel 1",
  "Estante abierto 1, Nivel 2",
  "Estante abierto 1, Nivel 3",
  "Estante abierto 2, Nivel 1",
  "Estante abierto 2, Nivel 2",
  "Estante abierto 2, Nivel 3",
  "Estante abierto 2, Nivel 4",
  "Estante abierto 2, Nivel 5",
  "Estante abierto 2, Nivel 6",
  "Estante cerrado 1, Nivel 1",
  "Estante cerrado 1, Nivel 2",
  "Estante cerrado 1, Nivel 3",
  "Estante cerrado 1, Nivel 4",
  "Estante cerrado 1, Nivel 5",
  "Estante cerrado 1, Nivel 6",
  "Estante cerrado 2, Nivel 1",
  "Estante cerrado 2, Nivel 2",
  "Estante cerrado 2, Nivel 3",
  "Estante cerrado 2, Nivel 4",
  "Estante cerrado 2, Nivel 5",
  "Estante cerrado 2, Nivel 6",
  "Estante cerrado 3, Nivel 1",
  "Estante cerrado 3, Nivel 2",
  "Estante cerrado 3, Nivel 3",
  "Estante cerrado 3, Nivel 4",
  "G10",
  "Mesa",
  "Mesa Movible",
];

export default function AddMaterialModal() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const createMat = useCreateMaterial();

  const onSubmit = async (data: FormValues) => {
    try {
      await createMat.mutateAsync(data);
      toast({ title: "Agregado", description: "Material agregado con éxito", open: true });
      reset();
      setOpen(false);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive", open: true });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Nuevo material</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Material</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Número de serie */}
          <div>
            <label className="block mb-1">Número de serie</label>
            <Input
              {...register("num_serie", { required: "Este campo es obligatorio" })}
            />
            {errors.num_serie && (
              <p className="text-red-600 text-sm">{errors.num_serie.message}</p>
            )}
          </div>

          {/* Nombre */}
          <div>
            <label className="block mb-1">Nombre</label>
            <Input
              {...register("nombre", { required: "Este campo es obligatorio" })}
            />
            {errors.nombre && (
              <p className="text-red-600 text-sm">{errors.nombre.message}</p>
            )}
          </div>

          {/* Tipo */}
          <div>
            <label className="block mb-1">Tipo</label>
            <Controller
              name="tipo"
              control={control}
              rules={{ required: "Selecciona un tipo" }}
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reactivos">Reactivos</SelectItem>
                    <SelectItem value="sensores">Sensores</SelectItem>
                    <SelectItem value="materiales">Materiales</SelectItem>
                    <SelectItem value="kits">Kits</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.tipo && (
              <p className="text-red-600 text-sm">{errors.tipo.message}</p>
            )}
          </div>

          {/* Cantidad */}
          <div>
            <label className="block mb-1">Cantidad</label>
            <Input
              type="number"
              step="1"
              {...register("cantidad", {
                valueAsNumber: true,
                required: "La cantidad es obligatoria",
              })}
            />
            {errors.cantidad && (
              <p className="text-red-600 text-sm">{errors.cantidad.message}</p>
            )}
          </div>

          {/* Ubicación */}
          <div>
            <label className="block mb-1">Ubicación</label>
            <Controller
              name="ubicacion"
              control={control}
              rules={{ required: "Selecciona una ubicación" }}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.ubicacion && (
              <p className="text-red-600 text-sm">{errors.ubicacion.message}</p>
            )}
          </div>

          {/* Observación */}
          <div>
            <label className="block mb-1">Observación</label>
            <Input {...register("observacion")} />
          </div>

          {/* Especial */}
          <div>
            <label className="block mb-1">Especial</label>
            <Input {...register("especial")} />
          </div>

          <Button type="submit">Guardar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
