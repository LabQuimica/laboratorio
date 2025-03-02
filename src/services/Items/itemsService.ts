"use client"

const URL = process.env.NEXT_PUBLIC_API_URL;

type TipoMaterial = "kits" | "sensores" | "liquidos" | "solidos";

export const fetchMateriales = async (tipo: TipoMaterial) => {
    let endpoint: string;

    switch (tipo) {
        case "kits":
          endpoint = "/materiales/getKits";
          break;
        case "sensores":
          endpoint = "/materiales/getSensores";
          break;
        case "liquidos":
          endpoint = "/materiales/getLiquidos";
          break;
        case "solidos":
          endpoint = "/materiales/getSolidos";
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