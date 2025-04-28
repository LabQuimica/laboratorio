"use client"

import { fetchDocentebyPractica, fetchDocentePracticas } from "@/services/Practicas/profesor/docentePracticasService";
import { CreadorPractica, Practica } from "@/types/PracticaTypes";
import { useQuery } from "@tanstack/react-query";

export const useDocentePracticas = (tipo: "creadas" | "asignadas" | "archivadas", id_docente: number) => {
    return useQuery<Practica[], Error>({
        queryKey: ["practicasDocente", tipo, id_docente],
        queryFn: () => fetchDocentePracticas(tipo, id_docente),
    });
}

export const useDocentePractica = (id_practica: number) => {
    return useQuery<CreadorPractica, Error>({
        queryKey: ["docentePractica", id_practica],
        queryFn: () => fetchDocentebyPractica(id_practica)
    });
};