"use client"
import { Practica } from "@/types/PracticaTypes";
import { Docente } from "@/types/DocenteTypes";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPracticas, fetchDocentes, createPractica, deletePractica } from "@/services/practicasService";

export const usePracticas = (tipo: "creadas" | "asignadas") => {
    const queryClient = useQueryClient();

    const practicasData = useQuery<Practica[], Error>({
        queryKey: ["practicas", tipo],
        queryFn: () => fetchPracticas(tipo),
    });

    const docentesData = useQuery<Docente[], Error>({
        queryKey: ["docentes"],
        queryFn: fetchDocentes,
    });

    const createPracticaMutation = useMutation({
        mutationFn: createPractica,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["practicas"] });
        },
    });

    const deletePracticaMutation = useMutation({
        mutationFn: deletePractica,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["practicas"] });
        },
    });

    return {
        practicasData, 
        docentesData, 
        createPractica: createPracticaMutation.mutateAsync, 
        deletePractica: deletePracticaMutation.mutateAsync
    };
}