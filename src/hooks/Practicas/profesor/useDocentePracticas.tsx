"use client"

import { fetchDocentePracticas } from "@/services/Practicas/profesor/docentePracticasService";
import { Practica } from "@/types/PracticaTypes";
import { useQuery } from "@tanstack/react-query";

export const useDocentePracticas = (tipo: "creadas" | "asignadas" | "archivadas", id_docente: number) => {
    return useQuery<Practica[], Error>({
        queryKey: ["practicasDocente", tipo, id_docente],
        queryFn: () => fetchDocentePracticas(tipo, id_docente),
    });
}
