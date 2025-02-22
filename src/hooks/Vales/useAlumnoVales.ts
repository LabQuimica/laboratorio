"use client"
import { fetchAlumnoVales } from '@/services/valeAlumno';
import { EstadoVale, Vale } from '@/types/ValeTypes';
import { useQuery } from '@tanstack/react-query';

export const useAlumnoVales = (estado: EstadoVale) => {
  return useQuery<Vale[], Error>({
    queryKey: ["valesAlumnos", estado],
    queryFn: () => fetchAlumnoVales(estado),
  });
};

// export const useValeDetails = (valeId: string | null) => {
//   return useQuery<ValeDetail, Error>({
//     queryKey: ["valeAlumnoDetails", valeId],
//     queryFn: () => fetchValeDetails(valeId!), // Asegúrate de que valeId no sea null antes de llamar a la función
//     enabled: !!valeId, // Habilita la consulta solo si valeId no es null
//   });
// };