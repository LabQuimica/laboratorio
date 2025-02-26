import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StatusChange,CommentChange } from '@/types/ValeTypes';
import { updateVales } from '@/services/valeAlumno';

const URL = process.env.NEXT_PUBLIC_API_URL;

export interface CombinedChange {
  id_vale: number;
  newStatus?: string;
  newObservation?: string;
}

function  compactChanges(statusChanges: StatusChange[], commentChanges: CommentChange[]): CombinedChange[] {
  const combinedChangesMap = new Map<number, CombinedChange>();

  // Procesar cambios de estado
  statusChanges.forEach((change) => {
    if (!combinedChangesMap.has(change.id_vale)) {
      combinedChangesMap.set(change.id_vale, { id_vale: change.id_vale });
    }
    combinedChangesMap.get(change.id_vale)!.newStatus = change.newStatus;
  });

  // Procesar cambios de comentarios
  commentChanges.forEach((change) => {
    if (!combinedChangesMap.has(change.id_vale)) {
      combinedChangesMap.set(change.id_vale, { id_vale: change.id_vale });
    }
    combinedChangesMap.get(change.id_vale)!.newObservation = change.newObservation;
  });

  return Array.from(combinedChangesMap.values());
}




export const useUpdateVales = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ statusChanges, commentChanges }: { statusChanges: StatusChange[], commentChanges: CommentChange[] }) => {
      const transformedData = compactChanges(statusChanges, commentChanges);
      return updateVales(transformedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['valesAlumnos'] });
      queryClient.invalidateQueries({ queryKey: ['valeAlumnoDetails'] });
    },
  });
};