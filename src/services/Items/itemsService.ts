"use client"

import { Material } from "@/types/MaterialesTypes";

const URL = process.env.NEXT_PUBLIC_API_URL;

type TipoMaterial = "kits" | "sensores" | "reactivos"| "materiales" | "equipos";

export const fetchMateriales = async (tipo: TipoMaterial) => {
    let endpoint: string;

    switch (tipo) {
        case "kits":
          endpoint = "/materiales/getKits";
          break;
        case "sensores":
          endpoint = "/materiales/getSensores";
          break;
        case "reactivos":
            endpoint = "/materiales/getReactivos";
            break;
        case "materiales":
          endpoint = "/materiales/getMateriales";
          break;
        case "equipos":
          endpoint = "/materiales/getEquipos";
          break;
        default:
          throw new Error("Tipo de material no válido");
    }

    const response = await fetch(`http://${URL}${endpoint}`);

    if (!response.ok) {
        throw new Error(`Error al obtener los ${tipo}`);
    }

    return response.json();
};

export const fetchItems = async (): Promise<Material[]> => {
  const response = await fetch(`http://${URL}/materiales/getItems`);
  if (!response.ok) {
    throw new Error("Error al obtener los items");
  }
  return response.json();
};