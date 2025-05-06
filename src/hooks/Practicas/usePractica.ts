"use client"
import { Practica } from "@/types/PracticaTypes";
import { Docente } from "@/types/DocenteTypes";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPracticas, fetchPracticaById, fetchDocentes, createPractica, deletePractica, asignarPractica, updatePractica, deleteMaterialPractica, updateStatusPractica, inhabilitarPracticaByGroup, inhabilitarPractica, inhabilitarPracticasGroup } from "@/services/Practicas/practicasService";
import { StatusChange } from "@/types/PracticaTypes";

export const usePracticas = (tipo: "creadas" | "asignadas" | "archivadas") => {
    return useQuery<Practica[], Error>({
        queryKey: ["practicas", tipo],
        queryFn: () => fetchPracticas(tipo),
    });
}

export const usePracticaById = (id_practica: number) => {
    return useQuery<Practica, Error>({
        queryKey: ["practica", id_practica],
        queryFn: () => fetchPracticaById(id_practica),
        enabled: !!id_practica,
    });
};

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
          queryClient.invalidateQueries({ queryKey: ["practicasDocente"] });
        },
    });
};

export const useDeletePractica = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ idPractica, profesorId }: { idPractica: number; profesorId?: number }) => deletePractica({ idPractica, profesorId }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["practicas"] });
          queryClient.invalidateQueries({ queryKey: ["practicasDocente"] });
          queryClient.invalidateQueries({ queryKey: ["valesProfesor"] });
          queryClient.invalidateQueries({ queryKey: ["valeProfesorDetails"] });
        },
    });
};

export const useAsignarPractica = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: asignarPractica,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["practicas"] });
          queryClient.invalidateQueries({ queryKey: ["practicasDocente"] });
          queryClient.invalidateQueries({ queryKey: ["valesProfesor"] });
          queryClient.invalidateQueries({ queryKey: ["valeProfesorDetails"] }); 
        },
    });
};

export const useUpdatePractica = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Practica> }) => 
        updatePractica(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["practicas"] }); 
            queryClient.invalidateQueries({ queryKey: ["practicasDocente"] });
            queryClient.invalidateQueries({ queryKey: ["valesProfesor"] });
            queryClient.invalidateQueries({ queryKey: ["valeProfesorDetails"] });
        },
        onError: (error) => {
            console.error("Error al actualizar la práctica:", error);
        }
    });
};

export const useDeleteMaterialPractica = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ practicaId, materialId }: { practicaId: number; materialId: number }) => deleteMaterialPractica(practicaId, materialId),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["practicas"] });
          queryClient.invalidateQueries({ queryKey: ["practicasDocente"] });
          queryClient.invalidateQueries({ queryKey: ["valesProfesor"] });
          queryClient.invalidateQueries({ queryKey: ["valeProfesorDetails"] });
        },
    });
};

export interface CombinedChange {
    id_practica: number;
    newStatus?: string;
}

function compactChanges(statusChanges: StatusChange[]) {
  const combinedChangesMap = new Map<number, CombinedChange>();
  statusChanges.forEach((change) => {
    if (!combinedChangesMap.has(change.id_practica)) {
      combinedChangesMap.set(change.id_practica, { id_practica: change.id_practica });
    }
    combinedChangesMap.get(change.id_practica)!.newStatus = change.newStatus;
  });

  return Array.from(combinedChangesMap.values());
}

export const useUpdatePracticaStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ statusChanges }: { statusChanges: StatusChange[] }) => {
      const transformedData = compactChanges(statusChanges);
      return updateStatusPractica(transformedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['practicas'] });
      queryClient.invalidateQueries({ queryKey: ['statusPracticas'] });
      queryClient.invalidateQueries({ queryKey: ["practicasDocente"] });
      queryClient.invalidateQueries({ queryKey: ["valesProfesor"] });
    },
  });
};

export const useInhabilitarPracticaByGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ practicaId, groupId }: { practicaId: number; groupId: number }) => inhabilitarPracticaByGroup(practicaId, groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practicas"] });
      queryClient.invalidateQueries({ queryKey: ["practicasDocente"] });
      queryClient.invalidateQueries({ queryKey: ["valesProfesor"] });
    },
  });
};

export const useInhabilitarPractica = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (practicaId: number) => inhabilitarPractica(practicaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practicas"] });
      queryClient.invalidateQueries({ queryKey: ["practicasDocente"] });
      queryClient.invalidateQueries({ queryKey: ["valesProfesor"] });
    },
  });
};

export const useInhabilitarPracticasGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupId: number) => inhabilitarPracticasGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practicas"] });
      queryClient.invalidateQueries({ queryKey: ["practicasDocente"] });
      queryClient.invalidateQueries({ queryKey: ["valesProfesor"] });
    },
  });
};