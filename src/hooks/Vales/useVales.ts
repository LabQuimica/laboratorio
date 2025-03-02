"use client"
import { fetchAlumnoVales,fetchAlumnoValesDetails, fetchProfesorVales, fetchProfesorValesDetails } from '@/services/valeAlumno';
import { EstadoVale, EstadoValeProfesor, Vale, ValeAlumnoDetails, ValeProfesor, ValeProfesorDetails } from '@/types/ValeTypes';
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

export const useValeDetailsProfesor = (id_practica_asignada: number, enabled = false) => {
  return useQuery<ValeProfesorDetails, Error>({
    queryKey: ["valeProfesorDetails", id_practica_asignada],
    queryFn: () => fetchProfesorValesDetails(id_practica_asignada),
    enabled: enabled && id_practica_asignada !== null, 
  });
};