"use client";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchDocentePracticas = async (tipo: "creadas" | "asignadas" | "archivadas", id_docente: number) => {
    const endpoint = tipo === "creadas"
    ? `http://${URL}/docentes/getPracticasCreadasDocente/${id_docente}`
    : `http://${URL}/docentes/getPracticasAsignadasDocente/${id_docente}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error("Error al obtener las practicas");
    }
    return response.json();
}