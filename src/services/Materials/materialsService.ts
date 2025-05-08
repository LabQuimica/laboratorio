// laboratorio/src/services/materialsService.ts
import type { Material } from "@/types/MaterialesTypes";
const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchReactivosLiquidos(): Promise<Material[]> {
  const res = await fetch(`http://${URL}/materiales/getReactivosLiquidos`);
  if (!res.ok) throw new Error("Error al cargar reactivos líquidos");
  return res.json() as Promise<Material[]>;
}

export async function fetchReactivosSolidos(): Promise<Material[]> {
  const res = await fetch(`http://${URL}/materiales/getReactivosSolidos`);
  if (!res.ok) throw new Error("Error al cargar reactivos sólidos");
  return res.json() as Promise<Material[]>;
}

export async function fetchSensores(): Promise<Material[]> {
  const res = await fetch(`http://${URL}/materiales/getSensores`);
  if (!res.ok) throw new Error("Error al cargar sensores");
  return res.json() as Promise<Material[]>;
}
export async function fetchMateriales(): Promise<Material[]> {
  const res = await fetch(`http://${URL}/materiales/getMateriales`);
  if (!res.ok) throw new Error("Error al cargar materiales");
  return res.json() as Promise<Material[]>;
}
export async function fetchKits(): Promise<Material[]> {
  const res = await fetch(`http://${URL}/materiales/getKits`);
  if (!res.ok) throw new Error("Error al cargar kits");
  return res.json() as Promise<Material[]>;
}
export async function fetchEquipos(): Promise<Material[]> {
  const res = await fetch(`http://${URL}/materiales/getEquipos`);
  if (!res.ok) throw new Error("Error al cargar equipos");
  return res.json() as Promise<Material[]>;
}

const BASE = `http://${URL}/materiales`;

export async function createMaterial(data: Partial<Material>): Promise<Material> {
  const res = await fetch(`${BASE}/createMaterial`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear');
  return res.json();
}

export async function updateMaterial(data: Partial<Material>): Promise<Material> {
  const res = await fetch(`${BASE}/updateMaterial`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar');
  return res.json();
}

export async function deleteMaterial(id_item: number): Promise<void> {
  const res = await fetch(`${BASE}/deleteMaterial`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_item }),
  });
  if (!res.ok) throw new Error('Error al eliminar');
}


