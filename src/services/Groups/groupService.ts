"use client"

import { AddGrupoCode } from "@/types/GroupTypes";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchGrupos = async () => {
    const endpoint = `http://${URL}/grupos/getGrupos`;
    
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error("Error al obtener los grupos");
    }
    return response.json();
};

export const gruposByPractica = async (practicaId: number) => {
    const response = await fetch(`http://${URL}/grupos/getGruposPractica/${practicaId}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
      });
    if (!response.ok) {
        throw new Error("Error al obtener los grupos");
    }
    return response.json();
};

export const grupoCode = async (grupoId: number) => {
    const response = await fetch(`http://${URL}/grupos/getGrupoCode/${grupoId}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
      });
    if (!response.ok) {
        throw new Error("Error al obtener los grupos");
    }
    return response.json();
};

export const addGrupoCode = async (data: AddGrupoCode) => {
    const response = await fetch(`http://${URL}/grupos/addGrupoCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Error al agregar el código al grupo");
    }
  
    return response.json();
};