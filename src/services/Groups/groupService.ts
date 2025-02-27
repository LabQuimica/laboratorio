"use client"

const URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchGrupos = async () => {
    const endpoint = `http://${URL}/grupos/getGrupos`;
    
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error("Error al obtener los grupos");
    }
    return response.json();
};