"use client"
import { fetchAlumnoVales,fetchAlumnoValesDetails, fetchProfesorVales } from '@/services/valeAlumno';
import { EstadoVale, EstadoValeProfesor, Vale, ValeAlumnoDetails, ValeProfesor } from '@/types/ValeTypes';
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

export const useProfesorVales = (estado: EstadoValeProfesor) => {
  return useQuery<ValeProfesor[], Error>({
    queryKey: ["valesProfesor", estado],
    queryFn: () => fetchProfesorVales(estado),
  });
};