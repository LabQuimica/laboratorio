// laboratorio/src/hooks/Materials/useMaterialMutations.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Material } from "@/types/MaterialesTypes";
import {
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "@/services/Materials/materialsService";

export function useCreateMaterial() {
  const qc = useQueryClient();
  return useMutation<Material, Error, Partial<Material>>({
    mutationFn: createMaterial,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["materials"] }),
  });
}

export function useUpdateMaterial() {
  const qc = useQueryClient();
  return useMutation<Material, Error, Partial<Material>>({
    mutationFn: updateMaterial,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["materials"] }),
  });
}

export function useDeleteMaterial() {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteMaterial,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["materials"] }),
  });
}