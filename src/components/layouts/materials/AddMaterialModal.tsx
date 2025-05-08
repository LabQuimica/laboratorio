// src/components/layouts/materials/AddMaterialModal.tsx
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
import { LOCATIONS } from "@/constants/locations";
import { MATERIAL_TYPES } from "@/constants/materialTypes";
import { BRANDS } from "@/constants/brands";
import type { Material } from "@/types/material";

type FormValues = Omit<
  Material,
  "id_item" | "fecha_modificacion" | "contenido_kit" | "marca"
>;

// Ponemos defaults en useForm
export default function AddMaterialModal() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      num_serie: "SN",
      nombre: "",
      tipo: "" as any,
      ubicacion: "" as any,
      cantidad: 0,
      observacion: null,
      especial: null,
      fk_marca_item: 1,
      status: true,
    },
  });
  const createMat = useCreateMaterial();

  const onSubmit = async (data: FormValues) => {
    // Garantizar num_serie no vacío
    if (!data.num_serie?.trim()) data.num_serie = "SN";
    try {
      await createMat.mutateAsync(data);
      toast({ title: "Agregado", description: "Material agregado con éxito", open: true });
      reset(); // limpia el form
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
          {/* N. Serie */}
          <div>
            <label className="block mb-1">N. Serie</label>
            <Input
              {...register("num_serie", { required: "El número de serie es obligatorio" })}
            />
            {errors.num_serie && (
              <p className="text-red-600 text-sm">{errors.num_serie.message}</p>
            )}
          </div>

          {/* Nombre */}
          <div>
            <label className="block mb-1">Nombre</label>
            <Input
              {...register("nombre", { required: "El nombre es obligatorio" })}
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
                <Select
                  value={field.value ?? undefined}
                  onValueChange={(v) => field.onChange(v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {MATERIAL_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t[0].toUpperCase() + t.slice(1)}
                      </SelectItem>
                    ))}
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
                  value={field.value ?? undefined}
                  onValueChange={(v) => field.onChange(v)}
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

          {/* Marca */}
          <div>
            <label className="block mb-1">Marca</label>
            <Controller
              name="fk_marca_item"
              control={control}
              rules={{ required: "Selecciona una marca" }}
              render={({ field }) => (
                <Select
                  value={String(field.value)}
                  onValueChange={(v) => field.onChange(Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {BRANDS.map((b) => (
                      <SelectItem key={b.value} value={String(b.value)}>
                        {b.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.fk_marca_item && (
              <p className="text-red-600 text-sm">{errors.fk_marca_item.message}</p>
            )}
          </div>

          {/* Observación */}
          <div>
            <label className="block mb-1">Observación</label>
            <Controller
              name="observacion"
              control={control}
              render={({ field }) => <Input {...field} value={field.value ?? ""} />}
            />
          </div>

          {/* Especial */}
          <div>
            <label className="block mb-1">Especial</label>
            <Controller
              name="especial"
              control={control}
              render={({ field }) => <Input {...field} value={field.value ?? ""} />}
            />
          </div>

          <Button type="submit">Guardar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
