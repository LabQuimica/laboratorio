"use client"
import { Practica } from "@/types/PracticaTypes";
import { Docente } from "@/types/DocenteTypes";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPracticas, fetchDocentes, createPractica, deletePractica } from "@/services/practicasService";

export const usePracticas = (tipo: "creadas" | "asignadas") => {
    return useQuery<Practica[], Error>({
        queryKey: ["practicas", tipo],
        queryFn: () => fetchPracticas(tipo),
    });
}

export const useDocentes =  () => {
    return useQuery<Docente[], Error>({
        queryKey: ["docentes"],
        queryFn: fetchDocentes,
    });
};

export const useCreatePractica = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPractica,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["practicas"] });
        },
    });
};

export const useDeletePractica = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ idPractica, profesorId }: { idPractica: number; profesorId: number }) => deletePractica({ idPractica, profesorId }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["practicas"] });
        },
    });
};