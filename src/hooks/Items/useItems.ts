"use client"

import { fetchMateriales } from '@/services/Items/itemsService';
import { useQuery } from '@tanstack/react-query';

type TipoMaterial = "kits" | "sensores" | "liquidos" | "solidos";

export const useMateriales = (tipo: TipoMaterial) => {
    return useQuery({
        queryKey: ["materiales", tipo],
        queryFn: () => fetchMateriales(tipo),
    });
};