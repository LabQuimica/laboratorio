// laboratorio/src/hooks/Materials/useMaterials.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import type { Material } from "@/types/material";
import {
  fetchReactivos,
  fetchSensores,
  fetchMateriales,
  fetchKits,
  fetchEquipos,
} from "@/services/Materials/materialsService";

type ViewType = "reactivos" | "materiales" | "sensores" | "kits" | "equipos";

export function useMaterials(viewType: ViewType) {
  // definimos la key como tupla literal para que TS la conozca
  const queryKey = ["materials", viewType] as const;

  // queryFn que maneja cada caso
  const queryFn = async (): Promise<Material[]> => {
    switch (viewType) {
      case "reactivos":
        return fetchReactivos();
      case "sensores":
        return fetchSensores();
      case "materiales":
        return fetchMateriales();
      case "kits":
        return fetchKits();
      case "equipos":
        return fetchEquipos();
    }
  };

  return useQuery<Material[], Error>({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 5,
  });
}
