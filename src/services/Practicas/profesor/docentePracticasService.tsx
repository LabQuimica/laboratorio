"use client";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchDocentePracticas = async (tipo: "creadas" | "asignadas" | "archivadas", id_docente: number) => {
    let endpoint;

    if (tipo === "creadas"){
      endpoint = `http://${URL}/docentes/getPracticasCreadasDocente/${id_docente}`;  
    }
    else if (tipo === "asignadas"){
      endpoint = `http://${URL}/docentes/getPracticasAsignadasDocente/${id_docente}`;  
    }
    else {
      endpoint = `http://${URL}/docentes/getPracticasInhabilitadasDocente/${id_docente}`;  
    }

    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error("Error al obtener las practicas");
    }
    return response.json();
}

export const fetchDocentebyPractica = async (id_practica: number) => {
  const endpoint = `http://${URL}/docentes/getDocentePractica/${id_practica}`;

  const response = await fetch(endpoint);
  if (!response.ok) {
      throw new Error("Error al obtener la práctica");
  }
  return response.json();
};