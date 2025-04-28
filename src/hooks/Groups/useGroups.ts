"use client"
import { addGrupoCode, fetchGrupos, grupoCode, gruposByPractica } from '@/services/Groups/groupService';
import { Grupo, GrupoCode } from '@/types/GroupTypes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGrupos = () => {
    return useQuery<Grupo[], Error>({
        queryKey: ["grupos"],
        queryFn: fetchGrupos,
    });
};

export const useGruposPractica = (practicaId: number) => {
    return useQuery<Grupo[], Error>({
        queryKey: ["gruposByPractica", practicaId],
        queryFn: () => gruposByPractica(practicaId),
        enabled: !!practicaId,
      });
};

export const useGrupoCode = (grupoId: number) => {
    return useQuery<GrupoCode, Error>({
        queryKey: ["grupoCode", grupoId],
        queryFn: () => grupoCode(grupoId),
        enabled: !!grupoId,
      });
};

export const useAddGrupoCode = () => {
    const queryClient = useQueryClient();
    
    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationFn: addGrupoCode,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["grupoCode"] });
        },
      });
    
    return { mutate, isPending, isError, isSuccess };
};