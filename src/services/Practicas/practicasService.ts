"use client"

import { CombinedChange } from "@/hooks/Practicas/usePractica";
import { Docente } from "@/types/DocenteTypes";
import { Practica } from "@/types/PracticaTypes";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchPracticas = async (tipo: "creadas" | "asignadas" | "archivadas") => {
    let endpoint;

    if (tipo === "creadas"){
      endpoint = `http://${URL}/practicas/getPracticasCreadas`;  
    }
    else if (tipo === "asignadas"){
      endpoint = `http://${URL}/practicas/getPracticasAsignadas`;  
    }
    else {
      endpoint = `http://${URL}/practicas/getPracticasInhabilitadas`;  
    }

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

export const inhabilitarPracticaByGroup = async (practicaId: number, groupId: number ) => {
  const response = await fetch(`http://${URL}/practicas/inhabilitarPracticaByGroup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({practicaId, groupId}),
  });

  if (!response.ok) {
    throw new Error('Error al inhabilitar practica');
  }
  return response.json();
};

export const inhabilitarPractica = async (practicaId: number) => {
  const response = await fetch(`http://${URL}/practicas/inhabilitarPractica`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ practicaId }),
  });

  if (!response.ok) {
    throw new Error('Error al inhabilitar práctica');
  }
  return response.json();
};

export const inhabilitarPracticasGroup = async (groupId: number) => {
  const response = await fetch(`http://${URL}/practicas/inhabilitarPracticasGrupo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ groupId }),
  });

  if (!response.ok) {
    throw new Error('Error al inhabilitar prácticas del grupo');
  }

  return response.json();
};