"use client"
import { fetchAlumnoVales } from '@/services/valeAlumno';
import { EstadoVale, Vale } from '@/types/ValeTypes';
import { useQuery } from '@tanstack/react-query';

export const useAlumnoVales = (estado: EstadoVale) => {
  return useQuery<Vale[], Error>({
    queryKey: ["vales", estado],
    queryFn: () => fetchAlumnoVales(estado),
  });
};