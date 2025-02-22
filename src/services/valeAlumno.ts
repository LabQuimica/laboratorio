import { Vale, ValeAlumnoDetails } from "@/types/ValeTypes";

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
