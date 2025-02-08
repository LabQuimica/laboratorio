"use client"
import { Practica } from "@/types/PracticaTypes";
import { Docente } from "@/types/DocenteTypes";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const URL = process.env.NEXT_PUBLIC_API_URL;

const fetchPracticas = async (): Promise<Practica[]> => {
  const response = await fetch(`http://${URL}/practicas/getPracticas`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchDocentes = async (): Promise<Docente[]> => {
  const response = await fetch(`http://${URL}/docentes/getDocentes`);
  if (!response.ok) {
    throw new Error("Error al obtener los docentes");
  }
  return response.json();
};

const createPractica = async (newPractica: { nombre: string; descripcion: string; creadorId: number }) => {
  const response = await fetch(`http://${URL}/practicas/crearPractica`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPractica),
  });

  if (!response.ok) {
    throw new Error("Error al crear la práctica");
  }

  return response.json();
};

const deletePractica = async ({ idPractica, profesorId }: { idPractica: number; profesorId: number }) => {
  const response = await fetch(`http://${URL}/practicas/deletePractica/${idPractica}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ profesorId }),
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la práctica");
  }

  return response.json();
};


export const usePracticas = () => {
  const queryClient = useQueryClient();

  const practicasData = useQuery<Practica[], Error>({
    queryKey: ["practicas"],
    queryFn: fetchPracticas,
  });

  const docentesData = useQuery<Docente[], Error>({
    queryKey: ["docentes"],
    queryFn: fetchDocentes,
  });

  const createPracticaMutation = useMutation({
    mutationFn: createPractica,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practicas"] });
    },
  });

  const deletePracticaMutation = useMutation({
    mutationFn: deletePractica,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practicas"] });
    },
  });

  return { practicasData, docentesData, createPractica: createPracticaMutation.mutateAsync, deletePractica: deletePracticaMutation.mutateAsync  };
};