"use client"

import { fetchItems, fetchMateriales } from '@/services/Items/itemsService';
import { Material } from '@/types/MaterialesTypes';
import { useQuery } from '@tanstack/react-query';

type TipoMaterial = "kits" | "sensores" | "reactivos" | "materiales" | "equipos";

export const useMateriales = (tipo: TipoMaterial) => {
    return useQuery({
        queryKey: ["materiales", tipo],
        queryFn: () => fetchMateriales(tipo),
    });
};

export const useAllMaterials = () => {
    return useQuery<Material[], Error>({
        queryKey: ["items"],
        queryFn: fetchItems,
    });
};