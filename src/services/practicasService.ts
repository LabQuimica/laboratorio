"use client"

import { Docente } from "@/types/DocenteTypes";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchPracticas = async (tipo: "creadas" | "asignadas") => {
    const endpoint = tipo === "creadas"
    ? `http://${URL}/practicas/getPracticasCreadas`
    : `http://${URL}/practicas/getPracticasAsignadas`;

    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error("Error al obtener las practicas");
    }
    return response.json();
}

export const fetchDocentes = async (): Promise<Docente[]> => {
  const response = await fetch(`http://${URL}/docentes/getDocentes`);
  if (!response.ok) {
    throw new Error("Error al obtener los docentes");
  }
  return response.json();
};

export const createPractica = async (newPractica: { nombre: string; descripcion: string; num_equipos: number, creadorId: number }) => {
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


export const deletePractica = async ({ idPractica, profesorId }: { idPractica: number; profesorId: number }) => {
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