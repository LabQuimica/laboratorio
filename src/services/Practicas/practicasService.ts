"use client"

import { CombinedChange } from "@/hooks/Practicas/usePractica";
import { Docente } from "@/types/DocenteTypes";
import { Practica } from "@/types/PracticaTypes";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchPracticas = async (tipo: "creadas" | "asignadas" | "archivadas") => {
    const endpoint = tipo === "creadas"
    ? `http://${URL}/practicas/getPracticasCreadas`
    : `http://${URL}/practicas/getPracticasAsignadas`;

    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error("Error al obtener las practicas");
    }
    return response.json();
}

export const fetchPracticaById = async (id_practica: number) => {
  const endpoint = `http://${URL}/practicas/getPractica/${id_practica}`;

  const response = await fetch(endpoint);
  if (!response.ok) {
      throw new Error("Error al obtener la práctica");
  }
  return response.json();
};

export const fetchDocentes = async (): Promise<Docente[]> => {
  const response = await fetch(`http://${URL}/docentes/getDocentes`);
  if (!response.ok) {
    throw new Error("Error al obtener los docentes");
  }
  return response.json();
};

export const createPractica = async (newPractica: { nombre: string; descripcion: string; num_equipos: number; creadorId?: number; materiales: { itemId: number; cantidad: number }[] }) => {
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


export const deletePractica = async ({ idPractica, profesorId }: { idPractica: number; profesorId?: number }) => {
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

export const asignarPractica = async (newPracticaAsignada: { practica: number; grupo: number; fecha_inicio: string; fecha_fin: string }) => {
  const response = await fetch(`http://${URL}/practicas/asignarPractica`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPracticaAsignada),
  });

  if (!response.ok) {
    throw new Error("Error al crear la práctica");
  }

  return response.json();
};

export const updatePractica = async (id: number, data: Partial<Practica>) => {
  const response = await fetch(`http://${URL}/practicas/updatePractica/${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  });

  if (!response.ok) {
      throw new Error("Error al actualizar la práctica");
  }

  return response.json();
};

export const deleteMaterialPractica = async (practicaId: number, materialId: number ) => {
  const response = await fetch(`http://${URL}/practicas/deletePracticaMaterial/${practicaId}/${materialId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

}

export const updateStatusPractica = async (changes: CombinedChange[]): Promise<void> => {
  const response = await fetch(`http://${URL}/practicas/updateSatusPractica`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(changes),
  });

  if (!response.ok) {
    throw new Error('Error actualizando los estados de practica');
  }
  return response.json();
};