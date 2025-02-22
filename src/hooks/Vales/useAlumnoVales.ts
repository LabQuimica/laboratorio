"use client"
import { fetchAlumnoVales,fetchAlumnoValesDetails } from '@/services/valeAlumno';
import { EstadoVale, Vale, ValeAlumnoDetails } from '@/types/ValeTypes';
import { useQuery } from '@tanstack/react-query';

export const useAlumnoVales = (estado: EstadoVale) => {
  return useQuery<Vale[], Error>({
    queryKey: ["valesAlumnos", estado],
    queryFn: () => fetchAlumnoVales(estado),
  });
};

export const useValeDetails = (valeId: number, enabled = false) => {
  return useQuery<ValeAlumnoDetails, Error>({
    queryKey: ["valeAlumnoDetails", valeId],
    queryFn: () => fetchAlumnoValesDetails(valeId),
    enabled: enabled && valeId !== null, 
  });
};