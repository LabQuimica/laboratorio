// laboratorio/src/hooks/Materials/useMaterials.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import type { Material } from "@/types/MaterialesTypes";
import {
  fetchSensores,
  fetchMateriales,
  fetchKits,
  fetchEquipos,
  fetchReactivosLiquidos,
  fetchReactivosSolidos
} from "@/services/Materials/materialsService";

type ViewType =
  | "reactivos"
  | "reactivos-liquidos"
  | "reactivos-solidos"
  | "sensores"
  | "materiales"
  | "kits"
  | "equipos";

export function useMaterials(viewType: ViewType) {
  // definimos la key como tupla literal para que TS la conozca
  const queryKey = ["materials", viewType] as const;

  // queryFn que maneja cada caso
  const queryFn = async (): Promise<Material[]> => {
    switch (viewType) {
      case "reactivos":
        // Mezcla ambos tipos de reactivos
        const [solidos, liquidos] = await Promise.all([
          fetchReactivosSolidos(),
          fetchReactivosLiquidos(),
        ]);
        return [...solidos, ...liquidos];
      case "reactivos-liquidos":
        return fetchReactivosLiquidos();
      case "reactivos-solidos":
        return fetchReactivosSolidos();
      case "sensores":
        return fetchSensores();
      case "materiales":
        return fetchMateriales();
      case "kits":
        return fetchKits();
      case "equipos":
        return fetchEquipos();
      default:
        return [];
    }
  };

  return useQuery<Material[], Error>({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 5,
  });
}
