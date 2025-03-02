"use client"
import { fetchGrupos } from '@/services/Groups/groupService';
import { Grupo } from '@/types/GroupTypes';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useGrupos = () => {
    return useQuery<Grupo[], Error>({
        queryKey: ["grupos"],
        queryFn: fetchGrupos,
    });
};