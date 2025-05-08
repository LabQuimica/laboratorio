// src/components/layouts/materials/EditMaterialModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { useUpdateMaterial } from "@/hooks/Materials/useMaterialMutations";
import { toast } from "@/hooks/use-toast";
import { LOCATIONS } from "@/constants/locations";
import { MATERIAL_TYPES } from "@/constants/materialTypes";
import { BRANDS } from "@/constants/brands";
import type { Material } from "@/types/material";
import { IconEdit } from "@tabler/icons-react";

interface Props {
  mat: Material;
  open: boolean;
  onClose: () => void;
}

type FormValues = Omit<Material, "fecha_modificacion" | "id_item" | "contenido_kit" | "marca">;

export default function EditMaterialModal({ mat, open, onClose }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      num_serie:     mat.num_serie || "SN",
      nombre:        mat.nombre,
      tipo:          mat.tipo,
      cantidad:      mat.cantidad,
      ubicacion:     mat.ubicacion || "",
      observacion:   mat.observacion || "",
      especial:      mat.especial || "",
      fk_marca_item: mat.fk_marca_item || 1, // Default to current value or 1 (Generico)
      status:        mat.status,
    },
  });
  const updateMat = useUpdateMaterial();

  const onSubmit = async (data: FormValues) => {
    if (!data.num_serie?.trim()) data.num_serie = "SN";
    try {
      await updateMat.mutateAsync({ ...mat, ...data });
      toast({ title: "Actualizado", description: "Material modificado con éxito", open: true });
      onClose();
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
              Editar Material
            </div>
          </DialogTitle>
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
            <Controller
              name="nombre"
              control={control}
              rules={{ required: "El nombre es obligatorio" }}
              render={({ field }) => <Input {...field} value={field.value ?? ""} />}
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
            <Controller
              name="cantidad"
              control={control}
              rules={{ required: "La cantidad es obligatoria" }}
              render={({ field }) => (
                <Input
                  type="number"
                  step="1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
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
                  value={String(field.value ?? mat.fk_marca_item)} // Mostrar la marca actual del registro
                  onValueChange={(v) => field.onChange(Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        BRANDS.find((b) => Number(b.value) === (field.value ?? mat.fk_marca_item))?.label || "Selecciona marca"
                      }
                    />
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

          <Button type="submit">Guardar Cambios</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
