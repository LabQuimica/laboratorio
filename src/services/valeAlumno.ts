import { CombinedChange } from "@/hooks/Vales/useUpdateVale";
import { Vale, ValeAlumnoDetails, ValeProfesor, ValeProfesorDetails } from "@/types/ValeTypes";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAlumnoVales = async (estado: string): Promise<Vale[]> => {
  const response = await fetch(`http://${URL}/vales/getAlumnoValeStatus?estado=${estado}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchAlumnoValesDetails = async (id: number): Promise<ValeAlumnoDetails> => {
  const response = await fetch(`http://${URL}/vales/getValeAlumnoDetails?id_vale=${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
export const fetchProfesorVales = async (estado: string): Promise<ValeProfesor[]> => {
  const response = await fetch(`http://${URL}/vales/getProfesorValeStatus?estado=${estado}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const updateVales = async (changes: CombinedChange[]): Promise<void> => {
  const response = await fetch(`http://${URL}/vales/updateVales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(changes),
  });

  if (!response.ok) {
    throw new Error('Error actualizando los vales');
  }
  return response.json();
};

export const fetchProfesorValesDetails = async (id_practica_asignada: number): Promise<ValeProfesorDetails> => {
  const response = await fetch(`http://${URL}/vales/getValeProfesorDetails?id_practica_asignada=${id_practica_asignada}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};